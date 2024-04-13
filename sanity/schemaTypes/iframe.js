export const iframe = {
    name: "iframe",
    title: "iFrame",
    type: "document",
    fields: [
        {
            type: 'image',
            title: 'iFrame Content',
            name: 'MainImage',
            fields: [
                {
                    type: 'url',
                    name: 'iFrameLink',
                    title: 'iFrame URL'
                },
                {
                    type: 'string',
                    name: 'mainTitle',
                    title: 'Title of iFrame'
                },
                {
                    type: 'slug',
                    name: 'slug',
                    title: 'image slug',
                    options: {
                        source: 'MainImage.mainTitle'
                    }
                },
            ]
        },
    ]
}