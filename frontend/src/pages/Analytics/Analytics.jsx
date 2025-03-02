import React, { useEffect, useState } from 'react';
import styles from './Analytics.module.css';
import StatCard from '../../Components/StatCard/StatCard';
import LineChart from '../../Components/LineChart/LineChart';
import BarChart from '../../Components/BarChart/BarChart';
import PieChart from '../../Components/PieChart/PieChart';
import api from '../../../api';

function Analytics() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [linkData, setLinkData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [linkDeviceData, setLinkDeviceData] = useState([]);
  const [shopDeviceData, setShopDeviceData] = useState([]);
  const [linkOsData, setLinkOsData] = useState([]);
  const [shopOsData, setShopOsData] = useState([]);
  const [topLinksData, setTopLinksData] = useState([]);
  const [topShopsData, setTopShopsData] = useState([]);
  const [linkReferrerData, setLinkReferrerData] = useState([]);
  const [shopReferrerData, setShopReferrerData] = useState([]);
  const [totalLinkClicks, setTotalLinkClicks] = useState(0);
  const [totalShopClicks, setTotalShopClicks] = useState(0);
  
  // Extract domain from full URL for referrer
  const extractDomain = (url) => {
    if (!url) return 'Direct';
    try {
      if (!url.includes('://')) return url;
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '');
    } catch (e) {
      return url;
    }
  };

  // Parse user agent to extract OS information
  const parseUserAgent = (userAgent) => {
    if (!userAgent) return 'Unknown';
    
    // Check for Android
    if (userAgent.includes('Android')) return 'Android';
    
    // Check for iOS devices
    if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) return 'iOS';
    
    // Check for Windows
    if (userAgent.includes('Windows')) return 'Windows';
    
    // Check for macOS
    if (userAgent.includes('Mac OS')) return 'macOS';
    
    // Check for Linux
    if (userAgent.includes('Linux') && !userAgent.includes('Android')) return 'Linux';
    
    return 'Other';
  };

  // Detect device type from user agent
  const detectDevice = (userAgent) => {
    if (!userAgent) return 'Unknown';
    
    if (userAgent.includes('Mobile') || userAgent.includes('Android') && userAgent.includes('AppleWebKit')) {
      return 'Mobile';
    } else if (userAgent.includes('iPad') || userAgent.includes('Tablet')) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  };

  useEffect(() => {
    // Fetch links data
    const fetchLinks = async () => {
      try {
        const response = await api.get('api/links', { withCredentials: true });
        const links = response.data.links;
        
        // Process clickData to ensure OS and device are correctly parsed
        const processedLinks = links.map(link => {
          const processedClickData = (link.clickData || []).map(click => ({
            ...click,
            device: click.device || detectDevice(click.userAgent),
            os: click.os || parseUserAgent(click.userAgent)
          }));
          
          return {
            ...link,
            clickData: processedClickData
          };
        });
        
        setLinkData(processedLinks);
        
        // Process total link clicks
        const totalClicks = processedLinks.reduce((total, link) => 
          total + (link.clickData?.length || 0), 0);
        setTotalLinkClicks(totalClicks);

        // Aggregate device data for links
        const linkDeviceCounts = {};
        processedLinks.flatMap(link => link.clickData || []).forEach(click => {
          const device = click.device || 'Unknown';
          linkDeviceCounts[device] = (linkDeviceCounts[device] || 0) + 1;
        });

        const formattedLinkDeviceData = Object.entries(linkDeviceCounts).map(([label, value]) => ({
          label,
          value
        }));
        setLinkDeviceData(formattedLinkDeviceData);
        
        // Aggregate OS data for links
        const linkOsCounts = {};
        processedLinks.flatMap(link => link.clickData || []).forEach(click => {
          const os = click.os || 'Unknown';
          linkOsCounts[os] = (linkOsCounts[os] || 0) + 1;
        });

        const formattedLinkOsData = Object.entries(linkOsCounts).map(([label, value]) => ({
          label,
          value
        }));
        setLinkOsData(formattedLinkOsData);

        // Determine the top 6 links by click count
        const sortedLinks = [...processedLinks].sort((a, b) => 
          (b.clickData?.length || 0) - (a.clickData?.length || 0)).slice(0, 6);

        const formattedTopLinksData = sortedLinks.map(link => ({
          label: link.title,
          value: link.clickData?.length || 0
        }));
        setTopLinksData(formattedTopLinksData);

        // Aggregate click data by referrer for links
        const linkReferrerCounts = {};
        processedLinks.flatMap(link => link.clickData || []).forEach(click => {
          const referrer = extractDomain(click.referrer) || 'Direct';
          linkReferrerCounts[referrer] = (linkReferrerCounts[referrer] || 0) + 1;
        });

        const formattedLinkReferrerData = Object.entries(linkReferrerCounts).map(([label, value]) => ({
          label,
          value
        }));
        setLinkReferrerData(formattedLinkReferrerData);

      } catch (error) {
        console.log(error);
      }
    };
    
    fetchLinks();
  }, []);

  useEffect(() => {
    // Fetch shops data
    const fetchShops = async () => {
      try {
        const response = await api.get('api/shops', { withCredentials: true });
        const shops = response.data.shops;
        
        // Process clickData to ensure OS and device are correctly parsed
        const processedShops = shops.map(shop => {
          const processedClickData = (shop.clickData || []).map(click => ({
            ...click,
            device: click.device || detectDevice(click.userAgent),
            os: click.os || parseUserAgent(click.userAgent)
          }));
          
          return {
            ...shop,
            clickData: processedClickData
          };
        });
        
        setShopData(processedShops);

        // Process total shop clicks
        const totalClicks = processedShops.reduce((total, shop) => 
          total + (shop.clickData?.length || 0), 0);
        setTotalShopClicks(totalClicks);

        // Aggregate device data for shops
        const shopDeviceCounts = {};
        processedShops.flatMap(shop => shop.clickData || []).forEach(click => {
          const device = click.device || 'Unknown';
          shopDeviceCounts[device] = (shopDeviceCounts[device] || 0) + 1;
        });

        const formattedShopDeviceData = Object.entries(shopDeviceCounts).map(([label, value]) => ({
          label,
          value
        }));
        setShopDeviceData(formattedShopDeviceData);
        
        // Aggregate OS data for shops
        const shopOsCounts = {};
        processedShops.flatMap(shop => shop.clickData || []).forEach(click => {
          const os = click.os || 'Unknown';
          shopOsCounts[os] = (shopOsCounts[os] || 0) + 1;
        });

        const formattedShopOsData = Object.entries(shopOsCounts).map(([label, value]) => ({
          label,
          value
        }));
        setShopOsData(formattedShopOsData);

        // Determine the top 6 shops by click count
        const sortedShops = [...processedShops].sort((a, b) => 
          (b.clickData?.length || 0) - (a.clickData?.length || 0)).slice(0, 6);

        const formattedTopShopsData = sortedShops.map(shop => ({
          label: shop.title,
          value: shop.clickData?.length || 0
        }));
        setTopShopsData(formattedTopShopsData);

        // Aggregate click data by referrer for shops
        const shopReferrerCounts = {};
        processedShops.flatMap(shop => shop.clickData || []).forEach(click => {
          const referrer = extractDomain(click.referrer) || 'Direct';
          shopReferrerCounts[referrer] = (shopReferrerCounts[referrer] || 0) + 1;
        });

        const formattedShopReferrerData = Object.entries(shopReferrerCounts).map(([label, value]) => ({
          label,
          value
        }));
        setShopReferrerData(formattedShopReferrerData);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchShops();
  }, []);

  const cards = [
    { id: 1, title: 'Clicks on Links' },
    { id: 2, title: 'Clicks on Shop' },
    { id: 3, title: 'CTR' },
  ];

  const handleCardSelect = (cardId) => {
    if (cardId !== 3) {
      setSelectedCard(cardId - 1);
    }
  };
 
  const [showDeviceData, setShowDeviceData] = useState(true);
  
  return (
    <div className={styles.analyticsContainer}>
      <h1 className={styles.analyticsTitle}>Overview</h1>

      <div className={styles.statsContainer}>
        {cards.map((card) => (
          <div 
            onClick={() => handleCardSelect(card.id)}
            key={card.id} 
            className={`${styles.statCard} ${selectedCard === card.id - 1 ? styles.active : ''}`}
          >
            <h3 className={styles.statTitle}>{card.title}</h3>
            <p className={styles.statValue}>
              {card.id === 1 ? totalLinkClicks : 
               card.id === 2 ? totalShopClicks : 
               "N/A"}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.chartContainer}>
        {
          selectedCard === 0 ? 
          <div className={styles.lineChartWrapper}>
            <h4>Clicks Over Time</h4>
            <LineChart links={linkData} shops={[]} />
          </div> : 
          <div className={styles.lineChartWrapper}>
            <h4>Clicks Over Time</h4>
            <LineChart links={[]} shops={shopData} />
          </div>
        }  
      </div>

      <div className={styles.lowerSection}>
        <div className={styles.barChartContainer}>
          <div className={styles.chartHeaderRow}>
            <h2>{showDeviceData ? 'Traffic by Device' : 'Traffic by OS'}</h2>
            <button 
              className={styles.toggleButton}
              onClick={() => setShowDeviceData(!showDeviceData)}
            >
              Show {showDeviceData ? 'OS Data' : 'Device Data'}
            </button>
          </div>
          <BarChart 
            data={showDeviceData 
              ? (selectedCard === 0 ? linkDeviceData : shopDeviceData)
              : (selectedCard === 0 ? linkOsData : shopOsData)
            } 
          />
        </div>

        <div className={styles.pieChartContainer}>
          <h2>Clicks by Referrer</h2>
          <PieChart data={selectedCard === 0 ? linkReferrerData : shopReferrerData} />
        </div>
      </div>

      <div className={styles.linkChartContainer}>
        <h2>Traffic by {selectedCard === 0 ? 'Links' : 'Shops'}</h2>
        <BarChart
          data={selectedCard === 0 ? topLinksData : topShopsData}
          horizontal={false}
        />
      </div>
    </div>
  );
}

export default Analytics;