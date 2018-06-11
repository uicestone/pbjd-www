
<script>
import { handleLoading } from "../utils/utils";
export default {
  mounted() {
    handleLoading();
  }
};
</script>

<template>
  <body>
		<div class="main page1">
			<img src="~@/assets/images/title.png" width="100%">
			<div class="header">
				<a @click="$router.go(-1)" href="###" class="back"><i class="fa fa-chevron-left"></i> 返回</a>
			</div>
			<div class="imgBox">
				<div class="imag">
					<img src="~@/assets/images/1.png">
					<img src="~@/assets/images/2.png">
					<img src="~@/assets/images/3.png">
					<img src="~@/assets/images/4.png">
				</div>
                
			</div>
			<div class="popBox">
        <div class="pop pop1">
              <img src="~@/assets/images/t1.png" width="100%" style="margin-top: 0.5rem;">
              <img src="~@/assets/images/t2.png" width="100%" style="margin-top: 0.5rem;">
              <div class="content">
                    <div class="roll">
      <div class="swiper-container swiper-no-swiping swiper-containerA">
          <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
          </div>
      </div>
          <!-- Add Pagination -->
          <div class="swiper-button-next swiper-button-nexta"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
          <div class="swiper-button-prev swiper-button-preva"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>								    
                    </div>
                    <p>安亭镇：“三五”党员先锋活动</p>
              </div>
        </div>
        
        <div class="pop pop2">
              <img src="~@/assets/images/t1.png" width="100%" style="margin-top: 0.1rem;">
              <div class="content">
                    <div class="roll">
      <div class="swiper-container swiper-no-swiping swiper-containerB">
          <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
          </div>
      </div>
          <!-- Add Pagination -->
          <div class="swiper-button-next swiper-button-nextb"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
          <div class="swiper-button-prev swiper-button-prevb"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>								    
                    </div>
                    <p>安亭镇：“三五”党员先锋活动222</p>
              </div>
        </div>
        
        <div class="pop pop3">
              <img src="~@/assets/images/t1.png" width="100%" style="margin-top: 0.1rem;">
              <img src="~@/assets/images/t2.png" width="100%" style="margin-top: 0.1rem;">
              <div class="content">
                    <div class="roll">
      <div class="swiper-container swiper-no-swiping swiper-containerC">
          <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
          </div>
      </div>
          <!-- Add Pagination -->
          <div class="swiper-button-next swiper-button-nextc"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
          <div class="swiper-button-prev swiper-button-prevc"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>								    
                    </div>
                    <p>安亭镇：“三五”党员先锋活动333</p>
              </div>
        </div>
        
        <div class="pop pop4">
              <img src="~@/assets/images/t1.png" width="100%" style="margin-top: 0.1rem;">
              <div class="content">
                    <div class="roll">
      <div class="swiper-container swiper-no-swiping swiper-containerD">
          <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
              <div class="swiper-slide"><img src="~@/assets/images/img.png" width="100%"height="100%"></div>
          </div>
      </div>
          <!-- Add Pagination -->
          <div class="swiper-button-next swiper-button-nextd"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
          <div class="swiper-button-prev swiper-button-prevd"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>								    
                    </div>
                    <p>安亭镇：“三五”党员先锋活动444</p>
              </div>
        </div>                      
        <i class="fa fa-close close" aria-hidden="true"></i>
  </div>	
		</div>
		
		
		<!--等待-->
		<div class="pre_load" >
		  <div class="wrapper">
		    <div class="inner">
		    	<span>L</span>
		    	<span>o</span>
		    	<span>a</span>
		    	<span>d</span>
		    	<span>i</span>
		    	<span>n</span>
		    	<span>g</span>
		    </div>
		  </div>
		</div>				
	</body>
</template>
