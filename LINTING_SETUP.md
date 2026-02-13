# 🚀 Configuración de Linting y Formateo - Angular 2026

## ⚠️ Requisito Importante: Node.js 20+

**Tu proyecto actualmente usa Node.js v16.17.0**, pero Angular 21 y las herramientas de linting modernas requieren **Node.js 20 o superior**.

### Actualizar Node.js

```bash
# Con nvm (recomendado)
nvm install 20
nvm use 20

# Con homebrew (macOS)
brew install node@20
```

Después de actualizar Node.js, reinstala las dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Herramientas Instaladas

### ✨ Prettier v3.8.1
Formateador de código automático con reglas estrictas de estilo.

### 🔍 ESLint v8.57.1
Analizador de código estático con reglas profesionales.

### 🅰️ Angular ESLint v21.2.0
Reglas específicas para Angular con las mejores prácticas.

### 📘 TypeScript v5.9.3
Configuración strict con todas las opciones de seguridad activadas.

---

## 🎯 Scripts Disponibles

```bash
# Formateo
npm run format          # Formatea todos los archivos
npm run format:check    # Verifica el formato sin modificar

# Linting
npm run lint            # Ejecuta ESLint en archivos TypeScript
npm run lint:fix        # Ejecuta ESLint y corrige automáticamente
npm run lint:html       # Ejecuta ESLint en templates HTML (requiere Node 20+)

# Verificación completa
npm run type-check      # Verifica tipos TypeScript
npm run check           # Ejecuta format:check + lint + type-check
npm run fix             # Ejecuta format + lint:fix
```

---

## 📋 Configuraciones

### TypeScript (tsconfig.json)
- ✅ `strict: true` - Modo estricto completo
- ✅ `noUncheckedIndexedAccess: true` - Seguridad en acceso a arrays/objetos
- ✅ `noUnusedLocals: true` - No permite variables sin usar
- ✅ `noUnusedParameters: true` - No permite parámetros sin usar
- ✅ `exactOptionalPropertyTypes: true` - Tipos opcionales exactos
- ✅ `noImplicitReturns: true` - Todas las rutas deben retornar
- ✅ `noFallthroughCasesInSwitch: true` - No permite casos sin break

### ESLint
- ✅ Prettier integration (formato automático)
- ✅ TypeScript strict rules
- ✅ Angular best practices
- ✅ Explicit function return types
- ✅ Explicit member accessibility
- ✅ No `any` types
- ✅ No console.log (excepto warn/error)
- ✅ OnPush change detection (recomendado)

### Prettier
- ✅ Single quotes
- ✅ Semicolons
- ✅ Trailing commas
- ✅ 100 caracteres por línea (TypeScript)
- ✅ 120 caracteres por línea (HTML)
- ✅ 2 espacios de indentación
- ✅ LF line endings

---

## 🔧 Integración con VS Code

Se han creado configuraciones en `.vscode/`:
- `settings.json` - Formateo automático al guardar
- `extensions.json` - Extensiones recomendadas

### Extensiones Recomendadas
1. **Angular Language Service** - Soporte para Angular
2. **ESLint** - Integración de ESLint
3. **Prettier** - Formateador de código
4. **EditorConfig** - Configuración del editor
5. **Error Lens** - Muestra errores en línea
6. **Path Intellisense** - Autocompletado de rutas
7. **Code Spell Checker** - Corrector ortográfico

---

## 📝 EditorConfig

Se ha configurado `.editorconfig` para mantener consistencia entre todos los editores:
- UTF-8 encoding
- LF line endings
- 2 espacios de indentación
- Trim trailing whitespace
- Insert final newline

---

## 🎨 Reglas TypeScript Destacadas

### Nomenclatura
```typescript
// ✅ Correcto
const myVariable = 'value';
const MY_CONSTANT = 'value';
class MyClass {}
interface MyInterface {}
enum MyEnum { Value }

// ❌ Incorrecto
const MyVariable = 'value';  // Variables en camelCase
class myclass {}             // Clases en PascalCase
```

### Funciones
```typescript
// ✅ Correcto - Tipo de retorno explícito
public getUserName(): string {
  return this.user.name;
}

// ❌ Incorrecto - Sin tipo de retorno
public getUserName() {
  return this.user.name;
}
```

### Accesibilidad
```typescript
// ✅ Correcto - Accesibilidad explícita
export class MyComponent {
  public name: string;
  private id: number;
  protected age: number;

  constructor() {} // constructor sin 'public'
}

// ❌ Incorrecto - Sin modificadores de acceso
export class MyComponent {
  name: string;
  id: number;
  age: number;
}
```

---

## 🚦 Reglas Angular Destacadas

### OnPush Change Detection
```typescript
// ✅ Recomendado
@Component({
  selector: 'app-my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {}
```

### Lifecycle Interfaces
```typescript
// ✅ Correcto
export class MyComponent implements OnInit {
  public ngOnInit(): void {
    // ...
  }
}

// ❌ Incorrecto - Sin interfaz
export class MyComponent {
  ngOnInit(): void {
    // ...
  }
}
```

### Component Selectors
```typescript
// ✅ Correcto
@Component({
  selector: 'app-my-component', // Obligatorio
})
```

---

## 🔄 Workflow Recomendado

### Antes de Commit
```bash
npm run check  # Verifica formato, linting y tipos
```

### Durante Desarrollo
```bash
npm run fix    # Formatea y corrige problemas automáticamente
```

### CI/CD
```bash
npm run check  # En tu pipeline de CI/CD
```

---

## 📚 Recursos

- [Angular Style Guide](https://angular.dev/style-guide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)

---

## 🎯 Estado Actual

✅ Prettier - **Funcionando**
⚠️ ESLint (TypeScript) - **Requiere Node.js 20+**
⚠️ ESLint (HTML) - **Requiere Node.js 20+**
✅ TypeScript strict - **Funcionando**
✅ EditorConfig - **Configurado**
✅ VS Code - **Configurado**

**Siguiente paso:** Actualizar a Node.js 20+ para habilitar todas las funcionalidades de ESLint.
