import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneCircleCheck, faClock, faEarthAmericas, faRankingStar } from '@fortawesome/free-solid-svg-icons';
class FeaturedServices extends Component {
    render() {
        return (
            <section className="services-section">
                <h1>Öne Çıkan Hizmetler</h1>
                <div className="services">
                    <div className="service-item">
                        <div className="box">

                            <i>
                                <FontAwesomeIcon icon={faPlaneCircleCheck} />
                            </i>
                        </div>
                        <h3>Uçuşlar</h3>
                        <p>Size uygun uçuşları bulun ve rezervasyon yapın.</p>
                    </div>
                    <div className="service-item">
                        <div className="box">
                            <i>
                                <FontAwesomeIcon icon={faClock} />
                            </i>
                        </div>

                        <h3>Rezervasyonlar</h3>
                        <p>Rezervasyonlarınızı kolayca yönetin ve değiştirin.</p>
                    </div>
                    <div className="service-item">
                        <div className="box">
                            <i>
                                <FontAwesomeIcon icon={faEarthAmericas} />
                            </i>
                        </div>

                        <h3>Uçuş Takibi</h3>
                        <p>Uçuşlarınızın gerçek zamanlı durumunu takip edin.</p>
                    </div>
                    <div className="service-item">
                        <div className="box">
                            <i>
                                <FontAwesomeIcon icon={faRankingStar} />
                            </i>
                        </div>
                        <h3>Bonus Programı</h3>
                        <p>Miles&Smiles bonus programımıza katılın ve faydalanın.</p>
                    </div>
                </div>
            </section>
        );
    }
}

export default FeaturedServices;
