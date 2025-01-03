import { DocumentTextIcon } from "@sanity/icons";
import { rule } from "postcss";
import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),

    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "features",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "dimensions",
      type: "object",
      fields: [
        {
          name: "height",
          type: "string",
        },
        {
          name: "width",
          type: "string",
        },
        {
          name: "depth",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "price",
      type: "number",
    }),
    defineField({
      name: "quantity",
      type: "number",
    }),
    defineField({
      name: "popular",
      type: "boolean",
      title: "Popular",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
