export const slideshow = {
    type: 'document',
    name: 'slideshow',
    fields: [
        {
            type: 'string',
            name: 'mainTitle',
            title: 'Title of Slideshow'
        },
        {
            type: 'string',
            name: 'backgroundColor',
            title: 'Background Color of Slideshow #HEX value'
        },
        {
            type: 'string',
            name: 'textColor',
            title: 'Text Color #HEX value'
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