import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Condominio', value: 'Condominio'},
              {title: 'Facturación', value: 'Facturación'},
              {title: 'Saint', value: 'Saint'},
              {title: 'Soporte', value: 'Soporte'},
              {title: 'Equipos', value: 'Equipos'},
              {title: 'Asesoría', value: 'Asesoría'},
              {title: 'Noticias', value: 'Noticias'},
              {title: 'Consejos', value: 'Consejos'},
              {title: 'Optimización', value: 'Optimización'},
              {title: 'Tendencias', value: 'Tendencias'},
              {title: 'Normativas', value: 'Normativas'},
            ],
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(2),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readtime',
      type: 'number',
      description: 'Estimated reading time in minutes (optional - auto-calculated if empty)',
      validation: (rule) => rule.min(1).max(60),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})