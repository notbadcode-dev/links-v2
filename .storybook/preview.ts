import { applicationConfig, type Decorator, type Preview } from '@storybook/angular';

import { provideCustomIcons } from '@app/core/icons/icons.provider';

type TLocale = 'es' | 'en';

const EN_TO_ES: Record<string, string> = {
  'Click Me': 'Haz clic',
  'Basic Button': 'Boton basico',
  Save: 'Guardar',
  Help: 'Ayuda',
  'Flat Button': 'Boton plano',
  'Stroked Button': 'Boton bordeado',
  'Accent Button': 'Boton acento',
  Delete: 'Eliminar',
  'Disabled Button': 'Boton deshabilitado',
  'Full Width Button': 'Boton ancho completo',
  'Add to favorites': 'Anadir a favoritos',
  'Text only': 'Solo texto',
  'Card title': 'Titulo de tarjeta',
  'Card subtitle': 'Subtitulo de tarjeta',
  'Basic Card': 'Tarjeta basica',
  'This is a simple card example': 'Este es un ejemplo simple de tarjeta',
  'Card Without Subtitle': 'Tarjeta sin subtitulo',
  'Outlined Card': 'Tarjeta delineada',
  'Filled Card': 'Tarjeta rellena',
  'Center Aligned Header': 'Cabecera centrada',
  'End Aligned Header': 'Cabecera alineada al final',
  'Card with Custom Class': 'Tarjeta con clase personalizada',
  'Disables delete action': 'Deshabilita accion de eliminar',
  'Button wrapper config': 'Configuracion de boton wrapper',
  'Dialog wrapper config': 'Configuracion de dialog wrapper',
  'Confirm action': 'Confirmar accion',
  'Confirm deletion': 'Confirmar eliminación',
  'Review the information before continuing': 'Revisa la informacion antes de continuar',
  'This action cannot be undone.': 'Esta accion no se puede deshacer.',
  'This action cannot be undone': 'Esta acción no se puede deshacer',
  'Do you want to delete this item?': '¿Quieres eliminar este elemento?',
  Accept: 'Aceptar',
  Cancel: 'Cancelar',
  'Create link': 'Crear enlace',
  'Fill out required fields': 'Completa los campos requeridos',
  Discard: 'Descartar',
  'Link title': 'Titulo del enlace',
  'Link URL': 'URL del enlace',
  'My link': 'Mi enlace',
  'Select Language': 'Seleccionar idioma',
  English: 'Ingles',
  Settings: 'Configuracion',
  Preferences: 'Preferencias',
  Theme: 'Tema',
  Security: 'Seguridad',
  Profile: 'Perfil',
  'Send Email': 'Enviar email',
  'Call Support': 'Llamar soporte',
  'View Location': 'Ver ubicacion',
  'Profile saved': 'Perfil guardado',
  'Sync started': 'Sincronizacion iniciada',
  Password: 'Contrasena',
  'Enter your password': 'Ingresa tu contrasena',
  'Password is required': 'La contrasena es obligatoria',
  'New Password': 'Nueva contrasena',
  'Confirm Password': 'Confirmar contrasena',
  Search: 'Buscar',
  Email: 'Correo',
  Name: 'Nombre',
  Submit: 'Enviar',
  Dashboard: 'Panel',
  Home: 'Inicio',
  'Sign In': 'Iniciar sesion',
  Documents: 'Documentos',
  Pictures: 'Imagenes',
  Music: 'Musica',
  'Page Header': 'Cabecera de pagina',
  'Main Content': 'Contenido principal',
  'Header Only Page': 'Pagina solo cabecera',
  'Body Only': 'Solo cuerpo',
};

const EN_ES_ENTRIES = Object.entries(EN_TO_ES).sort(([a], [b]) => b.length - a.length);
const ES_TO_EN_ENTRIES = EN_ES_ENTRIES.map(([en, es]) => [es, en] as const).sort(
  ([a], [b]) => b.length - a.length,
);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const translateText = (text: string, locale: TLocale): string => {
  const replacements = locale === 'es' ? EN_ES_ENTRIES : ES_TO_EN_ENTRIES;
  return replacements.reduce(
    (translated, [source, target]) => translated.split(source).join(target),
    text,
  );
};

const localizeValue = (value: unknown, locale: TLocale): unknown => {
  if (typeof value === 'string') {
    return translateText(value, locale);
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeValue(item, locale));
  }

  if (!isRecord(value)) {
    return value;
  }

  if ('es' in value || 'en' in value) {
    const localized = value[locale];
    if (localized !== undefined) {
      return localizeValue(localized, locale);
    }
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, currentValue]) => [key, localizeValue(currentValue, locale)]),
  );
};

const withLocale: Decorator = (storyFn, context) => {
  const locale = (context.globals['locale'] as TLocale) ?? 'es';
  document.documentElement.lang = locale;
  document.body.setAttribute('data-locale', locale);

  const story = storyFn();
  if (!isRecord(story)) {
    return story as never;
  }

  const localizedTemplate =
    typeof story['template'] === 'string' ? translateText(story['template'], locale) : story['template'];
  const storyProps = isRecord(story['props']) ? story['props'] : {};

  return {
    ...story,
    template: localizedTemplate,
    props: {
      ...(localizeValue(storyProps, locale) as Record<string, unknown>),
      locale,
    },
  } as never;
};

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Idioma',
      description: 'Idioma global de Storybook',
      defaultValue: 'es',
      toolbar: {
        icon: 'globe',
        dynamicTitle: true,
        items: [
          { value: 'es', title: 'ES' },
          { value: 'en', title: 'EN' },
        ],
      },
    },
  },
  initialGlobals: {
    locale: 'es',
  },
  decorators: [
    applicationConfig({
      providers: [provideCustomIcons()],
    }),
    withLocale,
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Enforce accessibility checks in CI.
      test: 'error',
    },
  },
};

export default preview;
