// http://find-a-driving-school.ca/top-tips-reducing-fuel-consumption/

/*
	latitude
	longitude
	vehicle_speed
	engine_speed
	odometer
	headlamp_status 
	high_beam_status
	fuel_consumed_since_restart
	fuel_level
	parking_brake_status
	brake_pedal_status
	accelerator_pedal_position
*/

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Enable PouchDB debugging
  // Pouch.DEBUG = true;

  Backbone.sync = BackbonePouch.sync({
    db: Pouch('vehicle_readings-backbone-0.0.12')
  });

  Backbone.Model.prototype.idAttribute = '_id';

  var VehicleReading = Backbone.Model.extend({
    defaults: function() {
      return {
      };
    },
    initialize: function() {
    },

    clear: function() {
      this.destroy();
    }

  });

  // VehicleReading Collection
  // ---------------

  // The collection of VehicleReadings is backed by *PouchDB* instead of a remote
  // server.
  var VehicleReadingList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: VehicleReading,

    // Include docs in Map Reduce response. Order by `order`.
    pouch: {
      fetch: 'query',
      options: {
        query: {
          fun: {
            map: function(doc) {
              emit(doc.order, null);
            }
          }
        }
      }
    }
  });

  // Create our global collection of **VehicleReadings**.
  window.vehicle_readings = new VehicleReadingList;

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    // Delegated events for creating new items, and clearing completed ones.
    events: {
    },

    // At initialization we bind to the relevant events on the `VehicleReadings`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting vehicle_readings that might be saved in *PouchDB*.
    initialize: function() {

      vehicle_readings.bind('add', this.addOne, this);
      vehicle_readings.bind('reset', this.addAll, this);
      vehicle_readings.bind('all', this.render, this);

      vehicle_readings.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

      if (vehicle_readings.length) {
      	
      }

    },

    // Add a single vehicle_reading item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(vehicle_reading) {
      
    },

    // Add all items in the **VehicleReadings** collection at once.
    addAll: function() {
      vehicle_readings.each(this.addOne);
    },
    
    clearAll: function() {
    	while(vehicle_readings.length){ vehicle_readings.pop();}
    },
    
    removeAll: function() {
    	PouchDB.destroy('vehicle_readings-backbone-0.0.12', function(){ console.info("Cleared database"); });
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.vehicle_data_view = new AppView;
	
});

