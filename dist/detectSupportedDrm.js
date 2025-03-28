export async function detectSupportedDrm() {
    const drmKeySystems = [
        { keySystem: "com.widevine.alpha", name: "Widevine" },
        { keySystem: "com.microsoft.playready", name: "PlayReady" },
        { keySystem: "com.apple.fps.1_0", name: "FairPlay" },
    ];
    const testConfig = [
        {
            initDataTypes: ["cenc"],
            videoCapabilities: [
                {
                    contentType: 'video/mp4; codecs="avc1.42E01E"',
                },
            ],
        },
    ];
    const supportedDrms = [];
    for (const drm of drmKeySystems) {
        try {
            await navigator.requestMediaKeySystemAccess(drm.keySystem, testConfig);
            supportedDrms.push(drm.name);
        }
        catch (e) {
            console.log("supportedDrms error", e);
        }
    }
    return supportedDrms;
}
