export default {
  name: "clubRecord",
  title: "Club Record",
  type: "document",

  fields: [
    {
      name: "event",
      title: "Konkurencja",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "athlete",
      title: "Zawodnik",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "result",
      title: "Wynik",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "date",
      title: "Data",
      type: "date",
      validation: Rule => Rule.required()
    },
    {
      name: "category",
      title: "Kategoria",
      type: "string",
      options: {
        list: [
          {title: "Senior/U23", value: "senior"},
          {title: "U20", value: "u20"},
          {title: "U18", value: "u18"},
          {title: "U16", value: "u16"}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: "isVisible",
      title: "Widoczny",
      type: "boolean",
      initialValue: true
    }
  ]
};
