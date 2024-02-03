# Leonardo AI Gallery

React component for displaying user images from Leonardo AI account.

## Project Description

```console

npm i leonardo-ai-gallery

```

This project is a React component that integrates with the Leonardo AI platform. It provides functionalities for fetching and displaying user-generated images, image variants, and manually launching generation jobs.

[Live Demo](https://leonardo-ai-gallery-playground.vercel.app/)

![Screenshot](/docs/gallery-screenshot1.png)

## Usage

- Preview images generations from your Leonardo-AI account
- Switch through available variations for an image (Upscale, Unzoom, No Background)
- Run new variation jobs for images from the Gallery (Upscale, Unzoom, No Background)
- Select available variation as a base for generation a new variation, e.g. you can sequentially unzoom several times to get a significant cumulative effect
- Run new generations based on existing ones with the same parameters. In Roadmap
- Download images. In Roadmap
- Custom additional actions on images. In Roadmap
- Headless CMS integrations. In Roadmap

## Documentation

```console

npm i leonardo-ai-gallery

```

```tsx
import { Gallery } from 'leonardo-ai-gallery';

const token = process.env.NEXT_PUBLIC_LEONARDO_API_TOKEN;

export default function Home() {
  return <Gallery token={token!} pages={3} limit={3}/>;
}
```



Sanity Custom Assets Source https://www.sanity.io/docs/custom-asset-sources

## Preview & Screenshots

https://github.com/usulpro/Leonardo-AI-Gallery/assets/14885189/ac4987a8-3f57-477f-aa16-0d7edde3c2f4


## Chatbot Integration and Guidance

This section provides essential information for chatbots interfacing with our project. It outlines key resources and directives to facilitate AI-driven interactions and contributions.

#### Key Files and Directories

- **`chatbot.md`**: Primary resource for chatbots. Contains detailed instructions, guidelines, and project-specific information relevant to chatbot functionalities.
- **`roadmap.md`**: Documents our development roadmap, task tracking, and checkpoints. Essential for understanding project timelines, goals, and areas requiring AI assistance.

#### Development Instructions

- **Project Setup**: Refer to `chatbot.md` for initial configuration and environment setup procedures.
- **Core Commands**: `chatbot.md` includes a list of vital project commands (build, test, deploy, etc.).

#### Working with the Project

- **Codebase Overview**: For an understanding of the codebase structure and location of critical modules, see `chatbot.md`.
- **Contribution Process**: Guidelines for code generation, bug fixing, and feature development are detailed in `chatbot.md`.

#### Tracking Progress and Tasks

- **Project Roadmap**: `roadmap.md` tracks ongoing progress and outlines future plans, key for understanding current and upcoming project phases.
- **Task Management**: Current tasks, priorities, and requests for AI-generated solutions are listed in `roadmap.md`.

#### Collaboration and Communication

- **Discussions and Clarifications**: For project-related discussions or questions, consult the 'Discussions' section in `roadmap.md`.
- **Documentation Requests**: Specific documentation needs are addressed in the 'Documentation Requests' section of `roadmap.md`.

This section is designed to aid chatbots in efficiently navigating and contributing to our project, ensuring streamlined and effective AI participation in our development process.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Credentials

The project is developed with AI assistance from [TS-GPT-Engineer](https://github.com/usulpro/TS-GPT-Engineer).

**Created by Oleg Proskurin**

Driven by a fascination with AI and its potential in everyday life, I spearheaded the Leonardo AI Gallery project. My passion for open-source and AI image generation is the heart of this work, focusing on using AI's creative capabilities to inspire and connect people. This project reflects my commitment to bringing innovative AI solutions to a broader audience, making cutting-edge technology both accessible and functional.

Connect with Me:

GitHub: github.com/usulpro

Twitter: @usulpro

LinkedIn: linkedin.com/in/olegproskurin

Blogs: focusreactive.com/blog/author/usulpro | dev.to/usulpro

_Crafted with ❤ for merging art and technology. 2024_
