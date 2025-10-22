If installation of chromium browser during default installation is blocked, use below command to bypass the restriction.
$env:NODE_TLS_REJECT_UNAUTHORIZED=0; npx playwright install
