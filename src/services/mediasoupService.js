import * as mediasoup from 'mediasoup-client'

class MediaSoupService {
    constructor() {
        this._socket = null
        this._mediaDevice = null
        this._stream = null
        this._mediaDevice = null
        this._videoTag = null
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
            this._mediaDevice = new mediasoup.Device();
            
        } catch (error) {
            console.log("## 2", error, mediasoup)
            if (error.name === 'UnsupportedError') {
                console.error('browser not supported');
            }
        }
        await this._mediaDevice.load({ routerRtpCapabilities });
    }

    async consume(transport) {
        const { rtpCapabilities } = this._mediaDevice;
        console.log("rtpCapabilities", rtpCapabilities)
        const data = await this._socket.request('consume', { rtpCapabilities });
        const {
            producerId,
            id,
            kind,
            rtpParameters,
        } = data;
    
        let codecOptions = {};
        const consumer = await transport.consume({
            id,
            producerId,
            kind,
            rtpParameters,
            codecOptions,
        });
        const stream = new MediaStream();
        stream.addTrack(consumer.track);
        return stream;
    }
    

    async startTransmission() {
     
        this._socket.on("connect", async () => {
            console.log("connected")
        })
    
        this._socket.on("gotProducer", async () => {
            console.log("gotProducer")
    
            const serverRtpParameters = await this._socket.request("getRouterRtpCapabilites")
            await this.loadDevice(serverRtpParameters)
    
            const data = await this._socket.request('createConsumerTransport', {
                forceTcp: false,
            });
    
            const transport = this._mediaDevice.createRecvTransport(data);
            transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
                try {
                    const res = await this._socket.request('connectConsumerTransport', {
                        transportId: transport.id,
                        dtlsParameters
                    })
                    callback(res)
                } catch (err) {
                    errback(err)
                }
            });
    
            transport.on('connectionstatechange', async (state) => {
                console.log("State changed", state)
                switch (state) {
                    case 'connected':
                        document.querySelector('#video').srcObject = await this._stream;
                        await this._socket.request('resume');
                        console.log("resume")
                        break;
    
                    case 'failed':
                        transport.close();
                        break;
    
                    default:
                        break;
                }
            });
    
            this._stream = this._consume(transport)
        })
    
        this._socket.on("disconnect", () => {
            console.log("disconnected")
        })
    
        this._socket.on("connect_error", (err) => {
            console.error("connect_error", err)
        })
    }
}

export default new MediaSoupService()
