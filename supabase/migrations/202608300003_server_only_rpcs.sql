-- Take the two writable RPCs off the anonymous role.
--
-- `claim_email_link` and `submit_feedback` are `security definer`, which is
-- correct: their callers are anonymous by definition and neither table may be
-- readable from a client. What was not correct is who could reach them. Both
-- were granted to `anon`, so anyone holding the publishable key could POST
-- straight to `/rest/v1/rpc/...` and skip the app entirely — putting arbitrary
-- text in the maintainer's inbox, or burning the sign-in throttle for an
-- address they do not own until its real owner is locked out of the only
-- sign-in method that needs no third-party account.
--
-- Neither function is called from a browser. Both are called by server routes
-- that already hold the secret key, and the secret key bypasses these grants,
-- so removing them costs the application nothing.
--
-- ORDER MATTERS. Apply this only after the release that switches
-- `app/api/auth/email/route.ts` and `app/api/feedback/route.ts` to the secret
-- key is deployed. Applied against the previous release, the email route's
-- throttle call fails closed and magic-link sign-in stops working entirely.

revoke execute on function public.claim_email_link(text, text, integer, integer, integer)
  from anon, authenticated;

revoke execute on function public.submit_feedback(text, text, text, text, text)
  from anon, authenticated;
