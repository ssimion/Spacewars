function AutoSignIn()
{
	var GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
	.requestEmail()
	.build();
}
function BuildingApi()
{
	mGoogleApiClient = new GoogleApiClient.Builder(this)
	.enableAutoManage(this /* FragmentActivity */, this /* OnConnectionFailedListener */)
	.addApi(Auth.GOOGLE_SIGN_IN_API, gso)
	.build();
}
function SignIn()
{
	Intent signIn = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient);
	startActivityForResult(signIn, RC_SIGN_IN);
}
