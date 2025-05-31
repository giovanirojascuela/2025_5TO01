## node.js y API
- Rutas y consultas.

### 1. Configuración de Llaves SSH y Git (Laboratorio)

Asumiendo que las llaves SSH ya están en una USB (`id_ed25519` y `id_ed25519.pub`), y solo necesitan copiarlas y configurar Git.

```bash
# 1.1. Copiar la llave SSH desde la USB al directorio .ssh del usuario
# Asegúrate de cambiar 'E:\' por la letra de tu unidad USB y 'TU_USUARIO' por tu nombre de usuario de Windows.
copy E:\id_ed25519 C:\Users\TU_USUARIO\.ssh\id_ed25519
copy E:\id_ed25519.pub C:\Users\TU_USUARIO\.ssh\id_ed25519.pub

# 1.2. Iniciar el agente SSH y añadir la llave
Get-Service ssh-agent | Set-Service -StartupType Manual #  Configura el servicio ssh-agent para inicio manual
ssh-agent                                             #  Inicia el agente SSH
ssh-add C:\Users\TU_USUARIO\.ssh\id_ed25519           #  Añade tu clave SSH al agente

# 1.3. Configurar usuario y email de Git (Única vez por equipo/usuario)
git config --global user.email "tu_correo_institucional@example.com" #  Establece tu email para los commits
git config --global user.name "Tu Nombre Apellido"                   #  Establece tu nombre para los commits
```

---

### 2. Clonar el Repositorio y Preparar tu Rama

Una vez configurado SSH y Git, el estudiante debe clonar el repositorio y asegurarse de que su rama local (`gio` en este ejemplo) esté actualizada con `main`.

```bash
# 2.1. Clonar el repositorio remoto a tu máquina local
git clone git@github.com:giovanirojascuela/2025_5TO01.git #  Clona el repositorio al directorio actual

# 2.2. Entrar en la carpeta del proyecto clonado
cd 2025_5TO01 #  Navega al directorio del repositorio

# 2.3. Cambiar a tu rama de trabajo (asumiendo que ya está creada remotamente)
git checkout gio #  Cambia a tu rama personal (ej. 'gio')

# 2.4. Asegurar que tu rama 'gio' esté actualizada con la 'main' remota
git pull origin main #  Trae los últimos cambios de 'main' del remoto y los fusiona en 'gio'
```

---

### 3. Ciclo de Desarrollo: Crear, Guardar y Enviar Cambios (Solo a tu Rama)

Aquí es donde el estudiante trabajará en sus archivos y subirá sus modificaciones a su propia rama remota.

```bash
# 3.1. Crea o modifica tus archivos aquí...
# Por ejemplo:
# echo "Mi primer código en la rama Gio" > mi_archivo_gio.txt
# (Realiza tus modificaciones de código)

# 3.2. Verifica el estado de tus archivos
git status #  Ve qué archivos han sido modificados, añadidos o eliminados

# 3.3. Añade tus cambios al área de staging
git add .  #  Prepara todos los cambios para el commit

# 3.4. Confirma los cambios con un mensaje claro y descriptivo
git commit -m "Descripción de los cambios realizados en mi tarea/código" #  Guarda tus cambios localmente

# 3.5. Envía tus cambios a tu rama remota (NO A 'main')
git push origin gio #  Sube tus cambios locales de 'gio' a la rama 'gio' en GitHub
```
cambio
---
