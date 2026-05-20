# Transfer Guide

Use this when moving the portfolio and local demo apps to another device.

## Folders To Move

- `C:\Users\steiv\Documents\GitHub\Portfolio-Website`
- `C:\Users\steiv\Documents\GitHub\AI-WhatsApp-Operations-Platform`
- `C:\Users\steiv\Documents\GitHub\ai-document-intelligence-uae`
- `C:\Users\steiv\Documents\GitHub\ai-construction-management-uae`
- SecureOps folder, if separate from the running local app at `http://127.0.0.1:8024/`

## Best Method

Push every repo to GitHub from the old device, then clone on the new device. This keeps history, branches, and rollback points intact.

```powershell
git status
git add -A
git commit -m "Save latest local work"
git push origin main
```

If push is blocked, fix GitHub authentication first. The current portfolio push was blocked because Windows was authenticated as `SkyWingRealEstate` while the remote is `hameesmomin/Portfolio-Website`.

## Offline Transfer Method

If you need to move by USB drive or external disk, copy the project folders but skip generated dependency folders:

- Skip `node_modules`
- Skip `vendor`
- Skip `.venv`
- Keep `.env` files only if you trust the target device
- Keep database files only for local demos, not public sharing

After copying, reinstall dependencies in each project:

```powershell
npm install
composer install
php artisan migrate --seed
npm run build
```

## Codex On Another Device

Install Codex on the other device and sign in with the same account. Then clone or copy these repositories to the same kind of local folder. Codex sessions may be visible from your account, but the actual local files, servers, databases, `.env` files, and generated assets must exist on that device too.

## Local Demo Ports

- Portfolio: `http://localhost:3099/` or Vite dev server port
- Aura Command: `http://127.0.0.1:8031/`
- Documind: `http://127.0.0.1:8032/`
- Siteflow: `http://127.0.0.1:8033/`
- SecureOps: `http://127.0.0.1:8024/`

## Security Note

Do not publish `.env` files, API keys, database dumps, or live demo credentials. Public visitors should only see the portfolio videos and request form. Keep full app access local or behind gated authentication.
