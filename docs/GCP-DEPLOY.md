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
- **Language login** — inline site editing (`/?edit=1`)
- **Normal login** — full CMS (`/admin/dashboard`): catalogs, tours, social media, events, certificates
- Email: `admin@zakher.travel`
- Password: stored in `server/.deploy-secrets.txt` locally (rotate in production)

## Content CMS API

| Endpoint | Description |
|----------|-------------|
| `GET /api/content/brochures?locale=az` | Published brochures |
| `GET /api/content/certificates?locale=az` | Certificates carousel |
| `GET /api/content/events?locale=az` | Events list |
| `GET /api/content/social?locale=az` | Social links + Instagram + YouTube |
| `GET /api/content/tours?locale=az` | Countries + tour cards |
| `GET /api/content/tours/:country/:tour?locale=az` | Tour detail page |
| `POST /api/admin/uploads` | Admin file upload (JWT required) |

After deploying schema changes:

```bash
cd server
npm run db:migrate:deploy
npm run content:seed
```

## GCS file uploads (production)

Cloud Run is stateless — uploads must go to **Google Cloud Storage**.

1. Create bucket, e.g. `zakher-cms-uploads` (public read or CDN in front).
2. Grant Cloud Run service account `Storage Object Admin` on the bucket.
3. Set env on `zakher-cms-api`:

```
GCS_BUCKET=zakher-cms-uploads
GCS_PUBLIC_BASE_URL=https://storage.googleapis.com/zakher-cms-uploads
```

Local dev uses `UPLOAD_DIR=../public/uploads` (served by Next.js at `/uploads/...`).

## Admin panel

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
