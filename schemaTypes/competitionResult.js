import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'competitionResult',
  title: 'Wyniki zawodów',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa zawodów',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Data zawodów',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'city',
      title: 'Miasto',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'country',
      title: 'Kraj',
      type: 'string',
      initialValue: 'Polska',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'medals',
      title: 'Medale',
      type: 'object',
      fields: [
        {
          name: 'gold',
          title: 'Złote',
          type: 'number',
          initialValue: 0,
          validation: Rule => Rule.min(0).max(99),
        },
        {
          name: 'silver',
          title: 'Srebrne',
          type: 'number',
          initialValue: 0,
          validation: Rule => Rule.min(0).max(99),
        },
        {
          name: 'bronze',
          title: 'Brązowe',
          type: 'number',
          initialValue: 0,
          validation: Rule => Rule.min(0).max(99),
        },
      ],
    }),

    defineField({
      name: 'description',
      title: 'Opis zawodów',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'isVisible',
      title: 'Widoczny na stronie',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta description',
          type: 'text',
          rows: 3,
        },
      ],
    }),
  ],

  orderings: [
    {
      title: 'Data (najnowsze)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
})
