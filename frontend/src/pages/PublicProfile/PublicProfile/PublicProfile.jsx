import React, { useEffect, useState, lazy } from 'react';
import { useParams } from 'react-router-dom';
import themes from '../../../utils/themes'
import Spinner from "../../../Components/Spinner/Spinner";
import api from '../../../../api';
import Mobile from '../../../Components/Mobile/Mobile';

function PublicProfile() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(`/api/profile/${username}`);
        console.log(response.data)
        setProfileData(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Profile not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  
  if (error) return <div>Error: {error}</div>;
  // if (!profileData) return <div>Profile not found</div>;
  return (
    <div className="public-profile-container">
      <Mobile
      isLoading={isLoading}
      setIsLoading={setIsLoading}
        backgroundColor={profileData?.bannerBackground ? profileData.bannerBackground : '#000'}
        username={profileData?.username ? `@${profileData.username}` : ''}
        profileImage={profileData?.profileImage 
          ? `${api.defaults.baseURL}${profileData.profileImage}` 
          : "/images/Iphone/default.png"}
        links={profileData?.links ? profileData.links : []}
        shops={profileData?.shops ? profileData.shops : []}
        Layout={profileData?.layout ? profileData.layout : 'Stack'}
        selectedTheme={profileData?.theme ? profileData.theme : -1}
        buttonColor={profileData?.buttonColor ? profileData.buttonColor : '#28A263'}
        manualColorChange={true}
        buttonFontColor={profileData?.buttonFontColor ? profileData.buttonFontColor : '#fff'}
        selectedFont={profileData?.font ? profileData.font : 'Poppins'}
        fontColor={profileData?.fontColor ? profileData.fontColor : '#000'}
        selectedButtonStyle={profileData?.buttonStyle ? profileData.buttonStyle : 'Fill'}
        selectedButtonRadius={profileData?.buttonRadius ? profileData.buttonRadius : '30px'}
        bio={{content: profileData?.bio ?  profileData.bio : '' }}
        
      />
    </div>
  );
}

export default PublicProfile;