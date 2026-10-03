/* Service worker: lets the app show real phone notifications (lock screen / notification shade). */
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('notificationclick',function(e){
  var ref=e.notification.data&&e.notification.data.ref;
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
    for(var i=0;i<list.length;i++){
      if('focus' in list[i]){
        if(ref)list[i].postMessage({type:'receipt',ref:ref});
        return list[i].focus();
      }
    }
    if(self.clients.openWindow)return self.clients.openWindow('./index.html'+(ref?'?receipt='+encodeURIComponent(ref):''));
  }));
});
