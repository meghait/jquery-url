(function($) {
  "use strict";

  /**
   * Private function for getting the regular expression for matching stuff in the URL.
   *
   * @param key
   *   The name of the parameter to get.
   */
  function getUrlRegex(key) {
    return new RegExp('([?|&]*)(' + key + '=' + ')([^&;]+?)?(&|#|;|$)', 'g');
  }

  /**
   * Get the value of a URL parameter.
   *
   * @param params
   *   The parameters from URL (aka search).
   * @param key
   *   The name of the parameter to get value for. Regex syntax supported.
   * @param forceMultiple
   *   (optional) Whether or not to force returning an array of all the values.
   *   When this function is given a regex, multiple values might be found.
   */
  function getUrlParameter(params, key, forceMultiple) {
    // forceMultiple is optional.
    if (forceMultiple === undefined) {
      forceMultiple = false;
    }

    // Get key regex.
    var regexp = getUrlRegex(key);

    var results = {};

    // Go through all the matches.
    var len = 0, result = false;
    while (result = regexp.exec(params)) {
      // Remove unwanted stuff from name.
      var keyFound = (result||[,,""])[2].replace(/^[?&]*/g, "").replace(/=*/g, "");

      // Make sure we update the length, but only if we actually add to it.
      if (results[keyFound] === undefined) {
        len++;
      }

      // Add to results.
      results[key] = decodeURIComponent((result||[,,,""])[3]);
    }

    // If multiple is forced, just return results.
    if (forceMultiple) {
      return results;
    }

    // Not found.
    if (len === 0) {
      return undefined;
    }

    // Single match. TODO Check browser support for this.
    if (len === 1) {
      for (var keyReturn in results) {
        if (results.hasOwnProperty(keyReturn)) {
          return results[keyReturn];
        }
      }
    }

    // Multiple matches.
    return results;
  }

  /**
   * Change an URL parameter.
   *
   * @param currSearch
   *   The current search from URL.
   * @param key
   *   The name of the parameter to change.
   * @param value
   *   The value to change the parameter to.
   */
  function changeUrlParameter(currSearch, key, value) {
    // Standard delimiter between parameters.
    var delimiter = "&";

    // Get the current value of the parameter.
    var currValue = getUrlParameter(currSearch, key);

    // If the current value is not set.
    if (currValue === undefined) {
      // If there is no other parameters, start with a different delimiter.
      if (currSearch.length === 0) {
        delimiter = "?";
      }

      // Make sure we add the delimiter, but only if it is not there already.
      var lstChar = currSearch.slice(-1);
      if (lstChar !== "?" && lstChar !== "&") {
        currSearch += delimiter;
      }

      // Add the value.
      currSearch += key + "=" + value;
    }
    // Otherwise, we have to replace the value.
    else {
      currSearch = replaceUrlParameter(currSearch, key, value);
    }
    return currSearch;
  }

  /**
   * Private function for replacing a URL parameter that already exists.
   *
   * @param params
   *   The current search from URL.
   * @param key
   *   The name of the parameter to replace.
   * @param value
   *   The value to replace with.
   */
  function replaceUrlParameter(params, key, value) {
    return params.replace(getUrlRegex(key), "$1$2"+encodeURIComponent(value)+"$4");
  }

  /**
   * Remove parameter from URL.
   *
   * @param params
   *   The current search from URL.
   * @param key
   *   The name of the parameter to remove.
   */
  function removeUrlParameter(params, key) {
    return params.replace(getUrlRegex(key), "$1$4");
  }

  /**
   * Get the current search, for use in all other functions from URL plugin.
   */
  function getCurrentSearch() {
    var href = window.location.href;

    // First see if there is a question mark, for splitting.
    var pos = href.indexOf('?');
    if (pos >= 0) {
      return href.slice(pos);
    }

    // If not, there might be a hash sign instead.
    pos = href.indexOf('#');
    if (pos >= 0) {
      return '?' + href.slice(href.indexOf('#'));
    }

    // Nothing defined.
    return '?';
  }

  /**
   * Trim trailing slashes from a URL
   *
   * @param string
   *   The string to trim.
   */
  function trimTrailingSlashes(string) {
    return string.replace(/\/+$/g, '');
  }

  /**
   * Trim leading slashes from a URL.
   *
   * @param string
   *   The string to trim.
   */
  function trimLeadingSlashes(string) {
    return string.replace(/^\/+/g, '');
  }

  /**
   * Trim both trailing and leading slashed from a URL.
   *
   * @param string
   *   The string to trim.
   */
  function trimSlashes(string) {
    return trimLeadingSlashes(trimTrailingSlashes(string));
  }

  /**
   * Public interface.
   *
   * Expose the functions that should be publicly accessible.
   */
  $.extend({
    changeUrlParameter : function(currSearch, key, value) {
      return changeUrlParameter(currSearch, key, value);
    },
    getUrlParameter : function(params, key, forceMultiple) {
      return getUrlParameter(params, key, forceMultiple);
    },
    removeUrlParameter : function(params, key) {
      return removeUrlParameter(params, key);
    },
    getCurrentSearch : function() {
      return getCurrentSearch();
    },
    trimTrailingSlashes : function(string) {
      return trimTrailingSlashes(string);
    },
    trimLeadingSlashes : function(string) {
      return trimLeadingSlashes(string);
    },
    trimSlashes : function(string) {
      return trimSlashes(string);
    }
  });

})(jQuery);
