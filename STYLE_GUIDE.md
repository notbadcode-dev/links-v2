# 📘 Guía de Estilo TypeScript/Angular - 2026

Esta guía documenta las convenciones de nomenclatura y reglas de estilo configuradas en ESLint.

---

## 📋 Tabla de Contenidos

- [Nomenclatura](#nomenclatura)
- [TypeScript](#typescript)
- [Angular](#angular)
- [Complejidad](#complejidad)
- [Imports](#imports)
- [Best Practices](#best-practices)

---

## 🏷️ Nomenclatura

### Interfaces: Prefijo `I`

```typescript
// ✅ CORRECTO
interface IUser {
  id: number;
  name: string;
}

interface IApiResponse<TData> {
  data: TData;
  status: number;
}

// ❌ INCORRECTO
interface User {  // Falta prefijo I
  id: number;
}

interface ApiResponse {  // Falta prefijo I
  data: any;
}
```

### Enums: Prefijo `E`

```typescript
// ✅ CORRECTO
enum EUserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

enum EStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

// ❌ INCORRECTO
enum UserRole {  // Falta prefijo E
  Admin = 'ADMIN',
}

enum Status {  // Falta prefijo E
  PENDING = 0,
}
```

### Type Aliases: Prefijo `T`

```typescript
// ✅ CORRECTO
type TUserId = string | number;
type TCallback = (data: string) => void;
type TUserData = Pick<IUser, 'name' | 'email'>;

// ❌ INCORRECTO
type UserId = string;  // Falta prefijo T
type Callback = (data: string) => void;  // Falta prefijo T
```

### Generics: Prefijo `T`

```typescript
// ✅ CORRECTO
class DataService<TEntity, TId> {
  public findById(id: TId): TEntity | null {
    return null;
  }
}

function processArray<TItem>(items: TItem[]): TItem[] {
  return items;
}

// ❌ INCORRECTO
class DataService<Entity, Id> {  // Faltan prefijos T
  findById(id: Id): Entity | null {
    return null;
  }
}
```

### Clases: PascalCase

```typescript
// ✅ CORRECTO
export class UserService {}
export class DataRepository {}
export class HttpClient {}

// ❌ INCORRECTO
export class userService {}  // Debe ser PascalCase
export class data_repository {}  // Debe ser PascalCase
```

### Variables y Funciones: camelCase

```typescript
// ✅ CORRECTO
const userName = 'John';
let isActive = true;
function getUserData(): IUser {}

// ❌ INCORRECTO
const UserName = 'John';  // Debe ser camelCase
let is_active = true;  // Debe ser camelCase
function GetUserData() {}  // Debe ser camelCase
```

### Constantes: UPPER_CASE

```typescript
// ✅ CORRECTO
const API_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 5000;

// ❌ INCORRECTO
const apiUrl = 'https://api.example.com';  // Constantes en UPPER_CASE
const maxRetryAttempts = 3;  // Constantes en UPPER_CASE
```

### Propiedades y Métodos Privados/Protected: Underscore

```typescript
// ✅ CORRECTO
export class UserComponent {
  public userName: string;
  private _userId: number;
  protected _apiKey: string;

  public getName(): string {
    return this.userName;
  }

  private _fetchData(): void {
    // ...
  }

  protected _validateInput(): boolean {
    return true;
  }
}

// ❌ INCORRECTO
export class UserComponent {
  userName: string;  // Falta modificador de acceso
  private userId: number;  // Falta underscore
  protected apiKey: string;  // Falta underscore

  getName(): string {  // Falta modificador de acceso
    return this.userName;
  }

  private fetchData() {  // Falta underscore y tipo de retorno
    // ...
  }
}
```

---

## 📘 TypeScript

### Tipos Explícitos

```typescript
// ✅ CORRECTO - Tipos explícitos en propiedades y parámetros
export class ProductService {
  private _products: IProduct[] = [];

  public addProduct(product: IProduct): void {
    this._products.push(product);
  }

  public getProducts(): IProduct[] {
    return this._products;
  }

  public findById(id: number): IProduct | undefined {
    return this._products.find((p) => p.id === id);
  }
}

// ❌ INCORRECTO - Tipos implícitos
export class ProductService {
  private _products = [];  // Tipo any[]

  addProduct(product) {  // Sin modificador, sin tipo
    this._products.push(product);
  }

  getProducts() {  // Sin tipo de retorno
    return this._products;
  }
}
```

### No usar `any`

```typescript
// ✅ CORRECTO
function processData<TData>(data: TData): TData {
  return data;
}

interface IApiError {
  message: string;
  code: number;
}

function handleError(error: IApiError): void {
  console.error(error.message);
}

// ❌ INCORRECTO
function processData(data: any): any {  // No usar any
  return data;
}

function handleError(error: any) {  // No usar any
  console.error(error.message);
}
```

### Promises y Async/Await

```typescript
// ✅ CORRECTO
public async fetchUsers(): Promise<IUser[]> {
  const response = await fetch('/api/users');
  return await response.json();
}

public async saveUser(user: IUser): Promise<void> {
  await this._api.post('/users', user);
}

// ❌ INCORRECTO
public fetchUsers(): Promise<IUser[]> {  // Falta async
  const response = fetch('/api/users');  // Falta await
  return response.json();  // Falta await
}

public saveUser(user: IUser) {  // Falta Promise<void>
  this._api.post('/users', user);  // Falta await
}
```

### Nullish Coalescing y Optional Chaining

```typescript
// ✅ CORRECTO
const userName = user?.name ?? 'Guest';
const itemCount = items?.length ?? 0;
const config = userConfig ?? defaultConfig;

// ❌ INCORRECTO
const userName = user && user.name || 'Guest';  // Usar ?.
const itemCount = items ? items.length : 0;  // Usar ?.
const config = userConfig !== null ? userConfig : defaultConfig;  // Usar ??
```

### Switch Exhaustiveness

```typescript
// ✅ CORRECTO
enum EUserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

function getRolePermissions(role: EUserRole): string[] {
  switch (role) {
    case EUserRole.Admin:
      return ['read', 'write', 'delete'];
    case EUserRole.User:
      return ['read', 'write'];
    case EUserRole.Guest:
      return ['read'];
    default:
      // TypeScript verifica que todos los casos estén cubiertos
      const _exhaustiveCheck: never = role;
      throw new Error(`Unhandled role: ${role}`);
  }
}

// ❌ INCORRECTO
function getRolePermissions(role: EUserRole): string[] {
  switch (role) {
    case EUserRole.Admin:
      return ['read', 'write', 'delete'];
    case EUserRole.User:
      return ['read', 'write'];
    // Falta caso Guest
  }
}
```

---

## 🅰️ Angular

### Component Naming & Selectors

**Nomenclatura de componentes:**
```
[nombre]           ← Componente propio
[nombre]-wrapper   ← Envuelve terceros
```

```typescript
// ✅ CORRECTO - Envuelve Material (tiene -wrapper)
@Component({
  selector: 'button-wrapper',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule],
})
export class ButtonComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {
    // Implementación
  }
}

// ✅ CORRECTO - Componente propio (sin -wrapper)
@Component({
  selector: 'custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrl: './custom-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCalendarComponent {}

// ❌ INCORRECTO - Falta -wrapper
@Component({
  selector: 'input-text',  // Debe ser 'input-text-wrapper'
  imports: [MatInputModule, MatFormFieldModule],  // Envuelve Material
  templateUrl: './input-text.component.html',
})
export class InputTextComponent {}

// ❌ INCORRECTO - Sobra -wrapper
@Component({
  selector: 'data-grid-wrapper',  // Debe ser 'data-grid'
  templateUrl: './data-grid.component.html',  // NO usa terceros
})
export class DataGridComponent {}

// ❌ INCORRECTO - Falta selector
@Component({
  templateUrl: './user-profile.component.html',
})
export class UserProfile {}  // También falta sufijo Component
```

### Lifecycle Hooks

```typescript
// ✅ CORRECTO
export class ProductListComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  constructor(private _productService: ProductService) {}

  public ngOnInit(): void {
    this._loadProducts();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _loadProducts(): void {
    this._productService
      .getProducts()
      .pipe(takeUntil(this._destroy$))
      .subscribe((products) => {
        // ...
      });
  }
}

// ❌ INCORRECTO
export class ProductListComponent {  // Falta OnInit
  destroy$ = new Subject();  // Falta modificador y tipo

  constructor(productService: ProductService) {}  // Falta private

  ngOnInit() {  // Falta modificador y tipo de retorno
    this.loadProducts();
  }

  ngOnDestroy() {  // Falta modificador y tipo de retorno
    this.destroy$.next();
  }
}
```

### Inputs y Outputs

```typescript
// ✅ CORRECTO
@Component({
  selector: 'app-user-card',
  template: `...`,
})
export class UserCardComponent {
  @Input() public user!: IUser;
  @Input() public showActions: boolean = false;

  @Output() public readonly userSelected = new EventEmitter<IUser>();
  @Output() public readonly actionClicked = new EventEmitter<string>();

  public onSelectUser(): void {
    this.userSelected.emit(this.user);
  }
}

// ❌ INCORRECTO
@Component({
  selector: 'app-user-card',
  template: `...`,
})
export class UserCardComponent {
  @Input() userData: any;  // Usar 'user', no 'userData', tipo any
  @Input('show') showActions;  // No renombrar inputs

  @Output('onSelect') userSelected = new EventEmitter();  // No renombrar
  @Output() onClick = new EventEmitter();  // No usar prefijo 'on'

  onSelectUser() {  // Falta modificador y tipo de retorno
    this.userSelected.emit(this.userData);
  }
}
```

### Prefijos No Permitidos en Inputs

```typescript
// ✅ CORRECTO
@Input() public enabled: boolean = false;
@Input() public active: boolean = false;
@Input() public visible: boolean = false;

// ❌ INCORRECTO
@Input() public isEnabled: boolean = false;  // No usar 'is' prefix
@Input() public canDelete: boolean = false;  // No usar 'can' prefix
@Input() public shouldShow: boolean = false;  // No usar 'should' prefix
@Input() public hasPermission: boolean = false;  // No usar 'has' prefix
```

### Standalone Components

```typescript
// ✅ RECOMENDADO (Angular 15+)
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  template: `...`,
})
export class UserListComponent {}

// ⚠️ LEGACY
@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule],
})
export class UserListModule {}
```

---

## 📊 Complejidad

### Límites de Complejidad

```typescript
// ✅ CORRECTO - Complejidad ciclomática < 15
public calculateDiscount(price: number, category: string): number {
  const BASE_DISCOUNT = 0.1;

  switch (category) {
    case 'electronics':
      return price * 0.15;
    case 'clothing':
      return price * 0.2;
    default:
      return price * BASE_DISCOUNT;
  }
}

// ❌ INCORRECTO - Complejidad ciclomática > 15
public processOrder(order: IOrder): void {
  if (order.isPaid) {
    if (order.isShipped) {
      if (order.isDelivered) {
        if (order.isReviewed) {
          // Demasiadas condiciones anidadas
          if (order.rating > 4) {
            if (order.hasDiscount) {
              // Refactorizar en funciones más pequeñas
            }
          }
        }
      }
    }
  }
}
```

### Límites de Líneas

- **Archivo**: Máximo 500 líneas
- **Función**: Máximo 150 líneas
- **Profundidad de anidación**: Máximo 4 niveles
- **Parámetros**: Máximo 5 parámetros

```typescript
// ✅ CORRECTO
private _validateUser(
  id: number,
  email: string,
  role: EUserRole,
  active: boolean,
  verified: boolean,
): boolean {
  return true;
}

// ❌ INCORRECTO - Más de 5 parámetros
private _validateUser(
  id: number,
  email: string,
  role: EUserRole,
  active: boolean,
  verified: boolean,
  premium: boolean,  // Parámetro 6
  createdAt: Date,   // Parámetro 7
): boolean {
  return true;
}

// ✅ MEJOR - Usar un objeto
interface IUserValidationParams {
  id: number;
  email: string;
  role: EUserRole;
  active: boolean;
  verified: boolean;
  premium: boolean;
  createdAt: Date;
}

private _validateUser(params: IUserValidationParams): boolean {
  return true;
}
```

---

## 📦 Imports

### Ordenamiento de Imports

```typescript
// ✅ CORRECTO - Ordenados alfabéticamente
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { IUser } from './interfaces/user.interface';
import { UserService } from './services/user.service';

// ❌ INCORRECTO - Sin orden
import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user.interface';
```

### No Duplicar Imports

```typescript
// ✅ CORRECTO
import { Component, Injectable, Input, OnInit } from '@angular/core';

// ❌ INCORRECTO
import { Component, OnInit } from '@angular/core';
import { Injectable, Input } from '@angular/core';  // Duplicado
```

---

## ✨ Best Practices

### Destructuring

```typescript
// ✅ CORRECTO
const { name, email, role } = user;
const [first, second] = items;

// ❌ INCORRECTO
const name = user.name;
const email = user.email;
const role = user.role;
```

### Template Literals

```typescript
// ✅ CORRECTO
const message = `Hello, ${userName}!`;
const url = `${API_URL}/users/${userId}`;

// ❌ INCORRECTO
const message = 'Hello, ' + userName + '!';
const url = API_URL + '/users/' + userId;
```

### Arrow Functions

```typescript
// ✅ CORRECTO
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);

// ❌ INCORRECTO
const doubled = numbers.map(function (n) {
  return n * 2;
});
```

### Object Shorthand

```typescript
// ✅ CORRECTO
const name = 'John';
const age = 30;
const user = { name, age };

// ❌ INCORRECTO
const user = { name: name, age: age };
```

### Strict Equality

```typescript
// ✅ CORRECTO
if (value === null) {}
if (count === 0) {}
if (name === 'admin') {}

// ❌ INCORRECTO
if (value == null) {}  // Usar ===
if (count == 0) {}     // Usar ===
if (name == 'admin') {} // Usar ===
```

### No Ternarios Anidados

```typescript
// ✅ CORRECTO
function getStatusColor(status: EStatus): string {
  if (status === EStatus.APPROVED) {
    return 'green';
  }
  if (status === EStatus.PENDING) {
    return 'yellow';
  }
  return 'red';
}

// ❌ INCORRECTO
const color = status === EStatus.APPROVED
  ? 'green'
  : status === EStatus.PENDING
    ? 'yellow'
    : 'red';
```

---

## 🎯 Orden de Miembros en Clases

```typescript
export class UserComponent implements OnInit, OnDestroy {
  // 1. Static fields
  private static readonly DEFAULT_ROLE = EUserRole.Guest;

  // 2. Decorated fields
  @Input() public user!: IUser;
  @Output() public readonly userChanged = new EventEmitter<IUser>();

  // 3. Public fields
  public userName: string = '';
  public isLoading: boolean = false;

  // 4. Protected fields
  protected _cache: Map<string, IUser> = new Map();

  // 5. Private fields
  private _destroy$: Subject<void> = new Subject();
  private _userId: number = 0;

  // 6. Constructor
  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {}

  // 7. Lifecycle hooks (public)
  public ngOnInit(): void {
    this._loadUser();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // 8. Public getters/setters
  public get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  // 9. Public methods
  public saveUser(): void {
    this._userService.save(this.user).subscribe();
  }

  public deleteUser(): void {
    this._confirmDelete();
  }

  // 10. Protected methods
  protected _validateUser(): boolean {
    return this.user.email.includes('@');
  }

  // 11. Private methods
  private _loadUser(): void {
    this._userService.getUser(this._userId).subscribe();
  }

  private _confirmDelete(): void {
    // Implementation
  }
}
```

---

## 📚 Recursos

- [Angular Style Guide](https://angular.dev/style-guide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

---

**¡Sigue estas convenciones para mantener un código limpio, consistente y mantenible!** 🚀
