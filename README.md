![image](https://github.com/user-attachments/assets/4a6a4040-f3b9-4d79-8c9b-e894ae5218f1)

# Nubble

Nubble é um aplicativo feito em React Native com proposta de utilizar uma stack moderna do ecossistema JavaScript:

- React Native (75)
- Expo (51)
- Shopify Restyle
- React Native Navigation (6)
- Zustand
- React Hook Form
- TanStack Query
- Firebase
- Axios
- Zod

## Ambiente de Desenvolvimento

### Requisitos

```
Java 17
Android Studio
Android UpsideDownCake (14)
Node js 20.5.1
```
### Setup

```
npm install
npm run android
```

### CI/CD

```
Ruby (3.3.7)
Bundler (2.6.6)
Fastlane 
```

## Metodologia e Arquitetura

Projeto é organizado com a estrutura de **services** e **usecases**. Front-End cria interfaces que serão, posteriormente, passadas para um **adapter** que irá converter a interface do Front-End para o Back-End.

### Exemplo

![image](https://github.com/user-attachments/assets/546e1382-70b5-4d05-8740-fbfe9f1ead13)

## Organização

```
src
├───api - contém a instância principal do Axios.
├───assets - contém imagens (SVG, PNG, etc) do projeto.
├───components - contém componentes genéricos.
├───domain - contém todas as chamadas de API e hooks com React Query.
├───hooks - contém hooks genéricos.
├───form - contém schemas reutilizáveis do Zod.
├───routes - contém todas as rotas do projeto, bem como stacks.
├───services - contém funções agrupadas por contexto. Ex.: Permissões para Android e IOS.
├───screens - contém todas as telas do projeto.
├───types - interfaces genéricas.
├───utils - utilidades genéricas.
├───test - utilidades para o Jest. Ex.: jest-setup.ts.
└───theme - configuração do design system com Restyle.
```

## Aplicativo

Nubble é uma rede social com as seguintes funcionalidades:

### Features

- Seguir um perfil
- Deixar de seguir
- Visualizar listagem de seguidores
- Visualizar perfil de outras pessoas
- Visualizar listagem de favoritos
- Editar perfil
- Visualizar, excluir, editar e comentar uma postagem
- Visualizar listagem de postagens
- Editar configurações de Dark Mode
- Visualizar termos de uso, política de privacidade
- Alterar senha e e-mail
- Recuperar senha
- Scroll Infinito

### Galeria

![image](https://github.com/user-attachments/assets/8618a40c-c692-4887-8875-730685b049b4)
![image](https://github.com/user-attachments/assets/8a04732c-3587-42b9-90b5-44fb4cb936f8)
![image](https://github.com/user-attachments/assets/36e974ac-0d43-445b-b8ea-95fc627be615)
![image](https://github.com/user-attachments/assets/ca50336b-793d-4cef-8d3b-6543b1740161)
![image](https://github.com/user-attachments/assets/d5404858-6365-4e64-95f8-b4fd7322e440)
![image](https://github.com/user-attachments/assets/683b0096-967c-40bb-8cd6-20058fc8ad02)


## Referências

#### Recursos de pré-visualização

- PWA Screenshots Generator - https://progressier.com/pwa-screenshots-generator
- Google Play Store Template - https://www.figma.com/community/file/960064054935700100/google-play-store-template
- Template for stores. App Store - https://www.figma.com/community/file/1048598786899116914

#### Publicação na PlayStore

- Publishing to Google Play Store: https://reactnative.dev/docs/signed-apk-android
- Sign your app: https://developer.android.com/studio/publish/app-signing
- Android App Bundle (AAB) and APKs: https://developer.android.com/guide/app-bundle/faq
- Gradle Manual: https://docs.gradle.org/current/userguide/userguide.html
- Android Gradle Plugin: https://developer.android.com/build/gradle-build-overview

#### CI/CD
- Github Actions Runner Images: https://github.com/actions/runner-images
