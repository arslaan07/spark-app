import MyToast from "../Components/MyToast/MyToast";

export const handleShareProfile = async (username) => {
    try {
      const shareableLink = `${window.location.origin}/${username}`;
  
      // Copy to clipboard
      await navigator.clipboard.writeText(shareableLink);
      MyToast('Profile link copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy link:', err);
      MyToast('Failed to copy profile link to clipboard!', 'error');
    }
  };
  