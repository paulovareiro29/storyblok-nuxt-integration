<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/paulovareiro29/storyblok-nuxt-integration">
    <img src="https://a.storyblok.com/f/88751/1776x360/b8979e5c96/sb-nuxt.png" alt="Logo">
  </a>

  <h3 align="center">Storyblok Nuxt Integration</h3>

  <p align="center">
    An easy way to start your nuxt-storyblok project
  </p>
</div>

<!-- GETTING STARTED -->

## Getting Started

This is project template to easily start your Nuxt 3 project with Storyblok.

### Stack

- [Nuxt 3](https://nuxt.com/)
- [Storyblok](https://www.storyblok.com/)
- [@storyblok/nuxt](https://github.com/storyblok/storyblok-nuxt)
- [TailwindCSS](https://tailwindcss.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/paulovareiro29/storyblok-nuxt-integration
   ```
2. Generate SSL certificates - [Instructions](#)
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your Storyblok Token in `./configuration/.env.local`
   ```
   STORYBLOK_TOKEN="ENTER YOUR API";
   ```
5. Start
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Generate SSL certificates

In order to run this project you need to generate localhost.pem files.

1. Install mkcert
   ```sh
   brew install mkcert
   brew install nss # if you are using Firefox
   ```
2. Generate certificates
   ```sh
   mkcert localhost
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Components

When a new component is created in storyblok and you want to render it on the project, first you need to create a new component in `components` folder, with the same name as the storyblok component, e.g a storyblok component named `grid-column` will have to be named `GridColumn.vue`.

### Mapping components

You can map a component name to another by adding the mapping inside the `services/storyblok/components.ts` file.

E.g. if you want to map a storyblok component named `teaser` to project component `Feature.vue`, the file would look like this:

```ts
export default {
  teaser: "feature",
} as Record<string, string>;
```

NOTE: All components that have been mapped will have the property `original_component` present in `props.blok` with the original component name. In the example above this property would have the value `teaser`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
