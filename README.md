# P-Frontend

## Descripción

P-Frontend es una aplicación web desarrollada con Next.js y React que permite la gestión de usuarios. La aplicación incluye funcionalidades como el inicio de sesión, la visualización de una lista de usuarios, la adición y actualización de usuarios, y más.

## Dependencias

- [Next.js](https://nextjs.org/) 14.0.4
- [React](https://reactjs.org/) 18
- [React DOM](https://reactjs.org/docs/react-dom.html) 18
- [Axios](https://axios-http.com/) ^1.7.7
- [Lucide React](https://lucide.dev/) ^0.454.0
- [Next Auth](https://next-auth.js.org/) ^4.24.10
- [Tailwind CSS](https://tailwindcss.com/) ^3.3.0
- [TypeScript](https://www.typescriptlang.org/) ^5

## Estructura del Proyecto

- **.next/**: Archivos generados por Next.js.
- **public/**: Archivos públicos estáticos.
- **src/**: Código fuente del proyecto.
  - **app/**: Contiene la estructura principal de la aplicación.
    - **components/**: Componentes reutilizables.
    - **forms/**: Formularios y contextos relacionados con la autenticación y usuarios.
  - **user.tsx**: Modelo de usuario.
- **globals.css**: Estilos globales.
- **next.config.js**: Configuración de Next.js.
- **postcss.config.js**: Configuración de PostCSS.
- **tailwind.config.ts**: Configuración de Tailwind CSS.
- **tsconfig.json**: Configuración de TypeScript.

## Ejecución del Proyecto

1. Clona el repositorio:
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    cd Willinn-Frontend
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Ejecuta el servidor de desarrollo:
    ```sh
    npm run dev
    ```

4. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en funcionamiento.

## Configuración Adicional

El proyecto utiliza variables de entorno definidas en el archivo `next.config.js`. Asegúrate de configurar las variables de entorno necesarias antes de ejecutar la aplicación.

---
