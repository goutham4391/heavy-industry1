
/**
 * @author Jason Roy for CompareNetworks Inc.
 * Thanks to mikejbond for suggested udaptes
 *
 * Version 1.1
 * Copyright (c) 2009 CompareNetworks Inc.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($)
{

    // Private variables
    
    var _options = {};
    var _container = {};
    var _breadCrumbElements = {};
    var _autoIntervalArray = [];
	var _easingEquation;
    
    // Public functions
    
    $132.fn.jBreadCrumb = function(options)
    {
		
        _options = $.extend({}, $.fn.jBreadCrumb.defaults, options);
        
        return this.each(function()
        {
            _container = $(this);
            setupBreadCrumb();

        });
        
    };
	
    
    // Private functions
    
    function setupBreadCrumb()
    {
		//Check if easing plugin exists. If it doesn't, use "swing"
		if(typeof($132.easing) == 'object')
		{
			_easingEquation = 'easeOutQuad'
		}
		else
		{
			_easingEquation = 'swing'
		}
    
        //The reference object containing all of the breadcrumb elements
        _breadCrumbElements = $132(_container).find('li');
        
        //Keep it from overflowing in ie6 & 7
        //$132(_container).find('ul').wrap('<div style="overflow:hidden; position:relative;  width: ' + $132(_container).css("width") + ';"><div>');
        //Set an arbitrary width width to avoid float drop on the animation
        //$132(_container).find('ul').width(5000);
		//$132(_container).find('ul').width(980);
        
        //If the breadcrumb contains nothing, don't do anything
        if (_breadCrumbElements.length > 0) 
        {
            $132(_breadCrumbElements[_breadCrumbElements.length - 1]).addClass('last');
            $132(_breadCrumbElements[0]).addClass('first');
            
            //If the breadcrumb object length is long enough, compress.
            
            if (_breadCrumbElements.length > _options.minimumCompressionElements) 
            {
                compressBreadCrumb();
            };
                    };
            };
    
    function compressBreadCrumb()
    {
    
        // Factor to determine if we should compress the element at all
        var finalElement = $132(_breadCrumbElements[_breadCrumbElements.length - 1]);
        
        
        // If the final element is really long, compress more elements
        if ($132(finalElement).width() > _options.maxFinalElementLength) 
        {
            if (_options.beginingElementsToLeaveOpen > 0) 
            {
                _options.beginingElementsToLeaveOpen--;
                
            }
            if (_options.endElementsToLeaveOpen > 0) 
            {
                _options.endElementsToLeaveOpen--;
            }
        }
        // If the final element is within the short and long range, compress to the default end elements and 1 less beginning elements
        if ($132(finalElement).width() < _options.maxFinalElementLength && $132(finalElement).width() > _options.minFinalElementLength) 
        {
            if (_options.beginingElementsToLeaveOpen > 0) 
            {
                _options.beginingElementsToLeaveOpen--;
                
            }
        }
        
        var itemsToRemove = _breadCrumbElements.length - 1 - _options.endElementsToLeaveOpen;
        
        // We compress only elements determined by the formula setting below
        
        //TODO : Make this smarter, it's only checking the final elements length.  It could also check the amount of elements.
        $132(_breadCrumbElements[_breadCrumbElements.length - 1]).css(
        {
            background: 'none'
        });
        
        $(_breadCrumbElements).each(function(i, listElement)
        {
            if (i > _options.beginingElementsToLeaveOpen && i < itemsToRemove) 
            {
            
                $132(listElement).find('a').wrap('<span></span>').width($132(listElement).find('a').width() + 10);
                
                // Add the overlay png.
                $132(listElement).append($132('<div class="' + _options.overlayClass + '"></div>').css(
                {
                    display: 'block'
                })).css(
                {
                    background: 'none'
                });
                if (isIE6OrLess()) 
                {
                    fixPNG($132(listElement).find('.' + _options.overlayClass).css(
                    {
                        width: '20px',
                        right: "-1px"
                    }));
                }
                var options = 
                {
                    id: i,
                    width: $132(listElement).width(),
                    listElement: $132(listElement).find('span'),
                    isAnimating: false,
                    element: $132(listElement).find('span')
                
                };
                $132(listElement).bind('mouseover', options, expandBreadCrumb).bind('mouseout', options, shrinkBreadCrumb);
                $132(listElement).find('a').unbind('mouseover', expandBreadCrumb).unbind('mouseout', shrinkBreadCrumb);
                listElement.autoInterval = setInterval(function()
                {
                    clearInterval(listElement.autoInterval);
                    $132(listElement).find('span').animate(
                    {
                        width: _options.previewWidth
                    }, _options.timeInitialCollapse, _options.easing,breadAdjustment);
                    //}, _options.timeInitialCollapse, _options.easing);
                }, (150 * (i - 2)));
                
            }
        });
        
    };
	
    function expandBreadCrumb(e)
    {
		
        var elementID = e.data.id;
        var originalWidth = e.data.width;
        $132(e.data.element).stop();
        $132(e.data.element).animate(
        {
            width: originalWidth
        }, 
        {
            duration: _options.timeExpansionAnimation,
            easing: _options.easing,
			complete:breadAdjustment,
            queue: false
        });

		
        return false;
        
    };
    
    function shrinkBreadCrumb(e)
    {
        var elementID = e.data.id;
        $132(e.data.element).stop();
        $132(e.data.element).animate(
        {
            width: _options.previewWidth
        }, 
        {
            duration: _options.timeCompressionAnimation,
            easing: _options.easing,
			complete:breadAdjustment,
            queue: false
        });
        return false;
    };
    
    function isIE6OrLess()
    {
        var isIE6 = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent);
        return isIE6;
    };
    // Fix The Overlay for IE6
    function fixPNG(element)
    {
        var image;
        if ($132(element).is('img')) 
        {
            image = $132(element).attr('src');
        }
        else 
        {
            image = $(element).css('backgroundImage');
            image.match(/^url\(["']?(.*\.png)["']?\)$/i);
            image = RegExp.$1;
            ;
        }
        $(element).css(
        {
            'backgroundImage': 'none',
            'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='" + image + "')"
        });
    };
    
    // Public global variables
    
    $132.fn.jBreadCrumb.defaults = 
    {
        maxFinalElementLength: 400,
        minFinalElementLength: 200,
        minimumCompressionElements: 1,
        endElementsToLeaveOpen: 1,
        beginingElementsToLeaveOpen: 0,
        timeExpansionAnimation: 250,
        timeCompressionAnimation: 250,
        timeInitialCollapse: 1000,
        easing: _easingEquation,
        overlayClass: 'chevronOverlay',
        previewWidth: 44
    };

	function breadAdjustment(){

		var jBC_ttl = 0;
		var jBC_dff = 0;
		var jBC_last = 0;
		var _obj = $132.fn.jBreadCrumb.defaults;
		
		$('#breadCrumb ul li').each(function(i){
			if(!$(this).hasClass('last')) jBC_dff += $(this).width();
		});

		jBC_dff += 20 + _obj.previewWidth;
		jBC_ttl = jBC_dff + $('#breadCrumb ul li.last').width() + 4 + _obj.previewWidth;
		
		jBC_last = $('#breadCrumb ul').width()-jBC_dff;
		$('#breadCrumb ul li.last').stop().animate({'maxWidth':jBC_last},{duration:_obj.timeExpansionAnimation,easing:'linear'});
		
	}
 
    
})($132);




