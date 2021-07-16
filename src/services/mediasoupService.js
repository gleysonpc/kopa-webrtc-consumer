import * as mediasoup from 'mediasoup-client'

class MediaSoupService {
    constructor() {
        this._socket = null
        this._mediaDevice = null
        this._stream = null
        this._videoObject = null
        this._audioObject = null
        this._transport = null
        this.recvTransport = null
        this._consumer = {video: null, audio: null}

        this.consume = this.consume.bind(this)
        this.createProducers = this.createProducers.bind(this)
        this.addStream = this.addStream.bind(this)
        this.rtcConnect = this.rtcConnect.bind(this)
        this.handleTransportConnect = this.handleTransportConnect.bind(this)
        this.handleStateChange = this.handleStateChange.bind(this)

    }

    setSocket(socketInstance) {
        if (!this._socket) {
            this._socket = socketInstance
        }
    }

    setStream(stream) {
        if (!this._stream) {
            this._stream = stream
        }
    }

    async stopTransmission() {
        await this._socket.request('producerTransportClosed')
    }

    async loadDevice(routerRtpCapabilities) {
        try {
            this._mediaDevice = new mediasoup.Device()
        } catch (error) {
            console.log('## 2', error, mediasoup)
            if (error.name === 'UnsupportedError') {
                console.error('browser not supported')
            }
        }
        await this._mediaDevice.load({ routerRtpCapabilities })
        return this._mediaDevice
    }

    async consume(transport, producer, requestedKind) {
        console.log('CONSUME', {transport, producer, requestedKind})
        const { rtpCapabilities } = this._mediaDevice
        const data = await this._socket.request('consume', {
            producerId: producer.id,
            kind: requestedKind,
            rtpCapabilities,
        })
        const { producerId, id, kind, rtpParameters } = data

        let codecOptions = {}
        const consumer = await transport.consume({
            id,
            producerId,
            kind,
            rtpParameters,
            codecOptions,
        })
        const stream = new MediaStream()

        stream.addTrack(consumer.track)

        this._socket.request('resume', {
            producerId: producer.id,
            kind: requestedKind,
        })
        
        if(requestedKind === 'video'){
           this._consumer.video = consumer
        }
        
        if(requestedKind === 'audio'){
           this._consumer.audio = consumer
        }


        return { stream, consumer }
    }

    setVideoObject(videoObject) {
        this._videoObject = videoObject
    }

    setAudioObject(audioObject) {
        this._audioObject = audioObject
    }

    addStream(producer, kind, stream) {
        console.log('addStream', {producer, kind, stream})
        const addVideoStream = (producer, stream) => {
            this._videoObject.srcObject = stream
        }

        const addAudioStream = (producer, stream) => {
            this._audioObject.srcObject = stream
        }

        switch (kind) {
            case 'audio':
                addAudioStream(producer, stream)
                break
            case 'video':
                addVideoStream(producer, stream)
                break
            default:
                break
        }
    }

    async createProducers(transport) {
        const producers = await this._socket.request('listProducers')

        for (const producer of producers) {
            const producerMedia = await this._socket.request(
                'getProducerMedia',
                { id: producer.id }
            )

            for (const kind of Object.keys(producerMedia)) {
                if (!producerMedia[kind]) {
                    continue
                }

                const { stream } = await this.consume(transport, producer, kind)
                this.addStream(producer, kind, stream)
            }
        }
    }

    async handleTransportConnect({ dtlsParameters }, callback, errback) {
        try {
            const res = await this._socket.request('connectConsumerTransport', {
                transportId: this._transport.id,
                dtlsParameters,
            })
            callback(res)
        } catch (err) {
            errback(err)
        }
    }

    async handleGotProducer(data, recvTransport) {

        console.log('<- handleGotProducer ->')
        const { user, kind } = data

        const { stream, consumer } = await this.consume(
            recvTransport,
            user,
            kind
        )
        // consumer.observer.on('transportclosed', function () {
        //     console.log('z1')
        // })
        // consumer.observer.on('trackended', function () {
        //     console.log('z2')
        // })
        // consumer.on('transportclosed', function () {
        //     console.log('y1')
        // })
        // consumer.on('trackended', function () {
        //     console.log('y2')
        // })
        // consumer.on('producerTransportClosed', function () {
        //     console.log('producerTransportClosed')
        // })
        // this.createProducer(user)

        // await this._socket.request('resume')
        if(kind === 'video'){
            let novoVideo = document.createElement('video')
            novoVideo.srcObject = stream
            document.body.appendChild(novoVideo)
            novoVideo.play()

        }

        //this.addStream(user, kind, stream)

    
    }

    async handleStateChange(state) {
        console.log('Transport State changed', state)
        switch (state) {
            case 'connected':
                if (await this._socket.request('hasProducer')) {
                    await this._socket.request('resume')
                }
                break

            case 'failed':
                this._receivedTransport.close()
                break

            default:
                break
        }
    }

    async rtcConnect() {
        const serverRtpParameters = await this._socket.request(
            'getRouterRtpCapabilities'
        )
        this._mediaDevice = await this.loadDevice(serverRtpParameters)

        this._transport = await this._socket.request(
            'createConsumerTransport',
            {
                forceTcp: false,
            }
        )

        this.recvTransport = this._mediaDevice.createRecvTransport(
            this._transport
        )

        const recvTransport = this.recvTransport

        recvTransport.on(
            'connect',
            this.handleTransportConnect.bind({ transport: recvTransport })
        )

        recvTransport.on(
            'connectionstatechange',
            this.handleStateChange.bind({ transport: recvTransport })
        )
        

        this.createProducers(recvTransport)

        this._socket.on('gotProducer', (data) =>
            this.handleGotProducer(data, recvTransport)
        )
        
        this._socket.on('mediaProducerPause', (data) => console.log('mediaProducerPause', data))
        this._socket.on('mediaProducerResume', (data) => console.log('mediaProducerResume', data))

        this._socket.on('producerTransportClosed', (data) => this._consumer.close())
        console.log('mediaDevice', this._mediaDevice)
        console.log('recvTransport', this.recvTransport)
        console.log('_transport', this._transport)
    }
}

export default new MediaSoupService()
