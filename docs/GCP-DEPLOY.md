# GCP Deploy — Zakher CMS (Deployed)

**Project:** `elevenmedia-em-2026`  
**Region:** `europe-west1`

## Live URLs

| Service | URL |
|---------|-----|
| **API (Cloud Run)** | https://zakher-cms-api-328040508763.europe-west1.run.app |
| Health check | https://zakher-cms-api-328040508763.europe-west1.run.app/health |
| Translations | `GET /api/translations?locale=az` |

## Infrastructure

- **Cloud SQL:** `zakher-cms-db` (PostgreSQL 15, `db-custom-1-3840`)
- **Database:** `zakher_cms`
- **Cloud Run service:** `zakher-cms-api`
- **Secrets (Secret Manager):** `zakher-database-url`, `zakher-jwt-secret`, `zakher-revalidate-secret`, `zakher-admin-password`

## Next.js frontend env

```
NEXT_PUBLIC_API_URL=https://zakher-cms-api-328040508763.europe-west1.run.app
REVALIDATE_SECRET=<from Secret Manager: zakher-revalidate-secret>
```

## Admin panel

- Login: `/admin` on your frontend domain
- Email: `admin@zakher.travel`
- Password: stored in `server/.deploy-secrets.txt` locally (rotate in production)

## Redeploy API

```bash
cd server
gcloud run deploy zakher-cms-api \
  --project=elevenmedia-em-2026 \
  --source . \
  --region=europe-west1 \
  --env-vars-file=cloudrun-env.yaml \
  --set-secrets=DATABASE_URL=zakher-database-url:latest,JWT_SECRET=zakher-jwt-secret:latest \
  --set-cloudsql-instances=elevenmedia-em-2026:europe-west1:zakher-cms-db
```

## Re-seed / bootstrap job

```bash
gcloud run jobs execute zakher-cms-init --project=elevenmedia-em-2026 --region=europe-west1 --wait
```
