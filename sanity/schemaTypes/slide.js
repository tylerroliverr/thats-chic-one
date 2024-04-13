export const slide = {
    type: 'object',
    name: 'slide',
    fields: [
        {
            type: 'date',
            name: 'date',
            title: 'Date'
        },
        {
            type: 'image',
            name: 'image',
            options: {
                hotspot: true
            }
        },
        {
            type: 'text',
            name: 'caption'
        },
        {
            type: 'text',
            name: 'description'
        },
        {
            title: "Left Or Right",
            name: "leftOrRight",
            type: "string"
          }
    ]
}