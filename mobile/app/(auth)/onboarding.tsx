import { Redirect } from 'expo-router';

// Placeholder for onboarding - redirects to login for now
export default function OnboardingScreen() {
    return <Redirect href="/(auth)/login" />;
}
