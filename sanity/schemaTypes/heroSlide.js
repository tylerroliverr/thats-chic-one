export const heroSlide = {
    type: 'document',
    name: 'heroSlide',
    title: 'Hero Slides',
    fields: [
      {
        title: "HeroSlides",
        name: "heroSlides",
        type: "array",
        of: [
          {
            title: "Slide",
            name: "slide",
            type: "image"
          },
          {
            "title": "Video file",
            "name": "video",
            "type": "mux.video"
          }
        ]
      }
    ]
  }