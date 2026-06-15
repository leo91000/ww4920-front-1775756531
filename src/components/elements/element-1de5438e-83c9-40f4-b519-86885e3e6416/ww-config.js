export default {
    options: {
        ignoredStyleProperties: ['overflow'],
    },
    editor: {
        label: {
            fr: 'Video - WeWeb',
            en: 'Video - WeWeb',
        },
        icon: 'play',
    },
    actions: [
        { label: 'Play video', action: 'playVideo' },
        { label: 'Pause video', action: 'pauseVideo' },
        {
            label: 'Seek to',
            action: 'seekTo',
            args: [
                {
                    name: 'Time',
                    type: 'number',
                },
            ],
        },
    ],
    triggerEvents: [
        { name: 'play', label: { en: 'On play' }, event: { value: '' }, default: true },
        { name: 'pause', label: { en: 'On pause' }, event: { value: '' } },
        { name: 'end', label: { en: 'On end' }, event: { value: '' } },
    ],
    properties: {
        file: {
            label: { en: 'File', fr: 'Fichier' },
            type: 'Video',
            section: 'settings',
            bindable: true,
            defaultValue: '',
        },
        previewImage: {
            label: { en: 'Preview image', fr: "Image de d'aperçu" },
            type: 'Image',
            section: 'settings',
            bindable: true,
            defaultValue: '',
        },
        videoStartTime: {
            label: {
                en: 'Start time (s)',
            },
            type: 'Number',
            options: (_, sidepanelContent) => {
                console.log(sidepanelContent.videoDuration);
                return { min: 0, max: sidepanelContent.videoDuration };
            },
            section: 'settings',
            bindable: true,
            defaultValue: 0,
        },
        videoDuration: {
            editorOnly: true,
            defaultValue: 0,
            hidden: true,
        },
        autoplay: {
            label: { en: 'Autoplay', fr: 'Lecture automatique' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
        },
        muted: {
            label: { en: 'Muted', fr: 'Muet' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        loop: {
            label: { en: 'Loop', fr: 'Lecture en boucle' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        controls: {
            label: { en: 'Controls', fr: 'Contrôles' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        preload: {
            label: { en: 'Preload', fr: 'Précharger' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: true,
        },
    },
};
