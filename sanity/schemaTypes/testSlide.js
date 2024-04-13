export const slideshowTest = {
    type: 'document',
    name: 'slideshow-test',
    fields: [
        {
            type: 'string',
            name: 'mainTitle',
            title: 'Title of Slideshow'
        },
        {
            type: 'image',
            name: 'MainImage',
            fields: [
                {
                    type: 'string',
                    name: 'title',
                    title: 'Title of Slideshow Again pls'
                },
                {
                    type: 'slug',
                    name: 'slug',
                    title: 'image slug',
                    options: {
                        source: 'MainImage.title'
                    }
                },
                {
                    type: 'array',
                    name: 'slides',
                    of: [
                        {
                            type: 'slide'
                        }
                    ]
                },
            ],
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                }
            ]
        },
    ]
}