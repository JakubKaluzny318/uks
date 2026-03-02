export default {
  name: "clubFace",
  title: "Twarz Klubu",
  type: "document",

  orderings: [
    {
      title: "Manual order",
      name: "manual",
      by: [{field: "order", direction: "asc"}]
    }
  ],

  fields: [

    {
      name: "name",
      title: "Imię i nazwisko",
      type: "string",
      validation: r => r.required()
    },

    {
      name: "role",
      title: "Rola / opis",
      type: "string",
      validation: r => r.required()
    },

    {
      name: "photo",
      title: "Zdjęcie",
      type: "image",
      options: { hotspot: true },
      validation: r => r.required()
    },

    {
      name: "order",
      title: "Kolejność",
      type: "number",
      validation: r => r.required()
    },

    {
      name: "isVisible",
      title: "Widoczny",
      type: "boolean",
      initialValue: true
    }

  ]
};
