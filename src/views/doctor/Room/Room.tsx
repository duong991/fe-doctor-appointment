import { JitsiMeeting } from '@jitsi/react-sdk'

const Room = () => {
    return (
        <div className="flex flex-col gap-4 h-full ">
            <JitsiMeeting
                domain="call.daugiasodep.vn"
                roomName="9128371209"
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
                    email: 'dongminhduong991@gmail.com',
                    displayName: 'Bác sĩ Đồng Minh Dương',
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '100%'
                    iframeRef.style.width = '99%'
                    iframeRef.style.border = '25px'
                }}
                onApiReady={(externalApi) => {}}
            />
        </div>
    )
}

export default Room
