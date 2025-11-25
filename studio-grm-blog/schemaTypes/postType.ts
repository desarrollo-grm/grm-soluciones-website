import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'URL amigable generada automáticamente a partir del título',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      description: 'Breve resumen del contenido del post',
      type: 'text',
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      description: 'Selecciona hasta dos etiquetas que describan el contenido del post',
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
      title: 'Fecha de publicación',
      description: 'Fecha en que se publicó el post, la hora no será considerada',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readtime',
      type: 'number',
      title: 'Tiempo de lectura',
      description: 'Tiempo estimado de lectura en minutos (opcional - se calcula automáticamente si está vacío)',
      validation: (rule) => rule.min(1).max(60),
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      description: 'Contenido principal del post. \n Consejos: \n\t-Utilizar h2 para los títulos principales, h3 para los subtítulos y así sucesivamente.\n\t-Usa negritas para palabres clave, no para títulos.\n\t-Usa cuantos links para referencias internas como puedas.',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})