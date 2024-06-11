import useAuth from '@/utils/hooks/useAuth'
import { JitsiMeeting } from '@jitsi/react-sdk'
import { useLocation } from 'react-router-dom'

const Room = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
        .toString()
        .split('=')[1]
    const roomId =
        'vpaas-magic-cookie-81ab7c0a26124f9c9a85e4294b6cd2ac/' + searchParams
    const url = '8x8.vc'

    const { user } = useAuth()
    console.log('🚀 ~ Room ~ user:', user)
    return (
        <div className="flex flex-col gap-4 h-full ">
            <JitsiMeeting
                domain={url}
                roomName={roomId}
                configOverwrite={{
                    startWithAudioMuted: false,
                    disableModeratorIndicator: true,
                    startScreenSharing: false,
                    enableEmailInStats: false,
                    disableRemoteMute: true,
                    disableRemoteControl: true,
                }}
                interfaceConfigOverwrite={{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                }}
                userInfo={{
                    email: user.email,
                    displayName: user.email,
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '100%'
                    iframeRef.style.width = '99%'
                    iframeRef.style.border = '25px'
                }}
                onApiReady={(externalApi) => {
                    externalApi.executeCommand('toggleChat', false)
                }}
            />
        </div>
    )
}

export default Room
