// pages/Profile/Profile.jsx
import { useState } from 'react';
import Iphone from '../../Components/Iphone/Iphone';
import styles from './Profile.module.css';

function Profile() {
    const [profileImage, setProfileImage] = useState('/images/Iphone/default.png');
    const [bio, setBio] = useState({ content: '' });
    const [selectedBtn, setSelectedBtn] = useState('link')
    const handleBioChange = (e) => {
        setBio({ content: e.target.value });
    };

    return (
        <div className={styles.profileContainer}>
            <section className={styles.leftSection}>
                <Iphone />
            </section>

            <section className={styles.rightSection}>
                <h2 className={styles.sectionTitle}>Profile</h2>

                {/* Profile Settings Section */}
                <div className={styles.profileSettings}>
                    <div className={styles.imageUpload}>
                        <div className={styles.profileImagePreview}>
                            <img src={profileImage} alt="Profile" className={styles.profileImage} />
                        </div>
                        <div className={styles.profileBtns}>
                            <button className={styles.uploadButton}>Pick an image</button>
                            <button className={styles.removeButton}>Remove</button>
                        </div>
                    </div>

                    <form className={styles.settingsForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="profileTitle">Profile Title</label>
                            <input type="text" id="profileTitle" value="@opopo_08" placeholder="Enter profile title" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                placeholder="Bio"
                                rows="4"
                                maxLength="80"
                                onChange={handleBioChange}
                                value={bio.content}
                                onDragStart={(e) => e.preventDefault()}
                            ></textarea>
                            <span className={`${styles.charCount} ${bio.content.length === 80 ? styles.charLimit : ''}`}>
                                {bio.content.length} / 80
                            </span>
                        </div>
                    </form>
                </div>

                {/* Add Link & Shop Section */}
                <div className={styles.addSection}>
                    <div className={styles.buttons}>
                              <span 
                                className={`${styles.button} ${selectedBtn === 'link' ? styles.active : ''}`}
                                onClick={() => setSelectedBtn('link')}
                              >
                                Link
                              </span>
                              <span 
                                className={`${styles.button} ${selectedBtn === 'shop' ? styles.active : ''}`}
                                onClick={() => setSelectedBtn('shop')}
                              >
                                Shop
                              </span>
                              </div>

                    <button className={styles.addButton}><span className={styles.plus}>+</span> Add</button>

                    <div className={styles.socialLinks}>
                        <div className={styles.socialLink}>
                            <div className={styles.linkInfo}>
                                <span>Instagram</span>
                                <input type="text" value="https://www.instagram.com/opopo_08/" readOnly />
                                <div className={styles.clickStats}>
                                    <span className={styles.icon}>📊</span> 0 clicks
                                </div>
                            </div>
                            <label className={styles.switch}>
                                <input type="checkbox" checked />
                                <span className={styles.slider}></span>
                            </label>
                        </div>

                        <div className={styles.socialLink}>
                            <div className={styles.linkInfo}>
                                <span>YouTube</span>
                                <input type="text" value="https://www.youtube.com/opopo_08/" readOnly />
                                <div className={styles.clickStats}>
                                    <span className={styles.icon}>📊</span> 0 clicks
                                </div>
                            </div>
                            <label className={styles.switch}>
                                <input type="checkbox" checked />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Banner Section */}
                <div className={styles.bannerSection}>
                    <h2 className={styles.sectionTitle}>Banner</h2>
                    <div className={styles.bannerPreview}>
                        <div className={styles.bannerContent}>
                            <div className={styles.profileAvatar}></div>
                            <div className={styles.profileInfo}>
                                <h3>@opopo_08</h3>
                                <p>@opopo_08</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.colorPicker}>
                        <p>Custom Background Color</p>
                        <div className={styles.colorOptions}>
                            <button className={styles.colorOption} style={{ backgroundColor: '#000000' }}></button>
                            <button className={styles.colorOption} style={{ backgroundColor: '#FFFFFF' }}></button>
                            <button className={styles.colorOption} style={{ backgroundColor: '#333333' }}></button>
                        </div>
                        <div className={styles.colorInput}>
                            <input type="text" value="#000000" readOnly />
                        </div>
                    </div>

                    <button className={styles.saveButton}>Save</button>
                </div>
            </section>
        </div>
    );
}

export default Profile;
