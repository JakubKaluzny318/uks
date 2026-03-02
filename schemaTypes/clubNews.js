import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'news',
  title: 'Aktualności',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          {title: 'Życie klubu', value: 'zycie-klubu'},
          {title: 'Sukcesy', value: 'sukcesy'},
          {title: 'Wydarzenia', value: 'wydarzenia'},
          {title: 'Inne', value: 'inne'},
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'eventDate',
      title: 'Data wydarzenia',
      type: 'date',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: {hotspot: true},
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'excerpt',
      title: 'Krótki opis (2–5 zdań)',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'content',
      title: 'Pełna treść (modal)',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'isVisible',
      title: 'Widoczne',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Wyróżnione',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {name: 'metaTitle', type: 'string', title: 'Meta title'},
        {name: 'metaDescription', type: 'text', title: 'Meta description'},
      ]
    }),
  ],
})
