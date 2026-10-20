# RevenueCat Apple IAP deployment notes

This is a deployment checklist, not a record of a configured production
environment. The repository does not assume a public Open Klippah hostname;
set the real deployment URL in the target environment before enabling webhooks.

## Before deploying

- Configure `REVENUECAT_WEBHOOK_AUTH_HEADER` in the frontend production secret
  store. Copy the value from the private environment configuration; never commit
  it here.
- If custom RevenueCat product identifiers are needed, configure
  `REVENUECAT_PRO_PRODUCT_IDS` and `REVENUECAT_SCALE_PRODUCT_IDS` from the
  production billing setup.
- Positively identify the production `DATABASE_URL` before running migrations.

## Database migrations

Run the frontend migration only against the intended frontend database:

```bash
cd frontend
DATABASE_URL="<production-database-url>" npx prisma migrate deploy
```

From the repository root, apply the backend migration against the intended
backend database:

```bash
psql "<production-backend-database-url>" -f backend/migrations/003_add_revenuecat_subscription_provider.sql
```

Deploy or redeploy only after both database migrations complete successfully.

## RevenueCat webhook

Configure the RevenueCat dashboard webhook to target the deployed frontend's
`/api/billing/revenuecat-webhook` route. Use the actual deployment origin from
your hosting provider; do not copy a placeholder hostname from this document.

After deployment, verify the webhook with a signed test event and confirm that
the application logs accept it without exposing the authorization value.
