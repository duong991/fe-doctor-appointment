import useAuth from '@/utils/hooks/useAuth'
import { JitsiMeeting } from '@jitsi/react-sdk'
import { useLocation } from 'react-router-dom'

const Room = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const roomId =
        'vpaas-magic-cookie-6e5379b6cb9d497689528c0df4c7bc3a/' + searchParams
    const url = '8x8.vc'

    const { user } = useAuth()
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
