import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { avatarImg } from 'discourse/widgets/post';
import { cook } from 'discourse/lib/text';
import RawHtml from 'discourse/widgets/raw-html';
import showModal from 'discourse/lib/show-modal';
import Composer from 'discourse/models/composer';
import { getOwner } from 'discourse-common/lib/get-owner';
import NotificationsButton from 'discourse/components/notifications-button';



export default createWidget('nova-future', {
  tagName: 'div.nova-future.widget-container',
  buildKey: (attrs) => 'nova-future',

  defaultState(attrs) {
    return {
      topic: attrs.topic,
      bookmarked: attrs.topic ? attrs.topic.bookmarked : null
    }
  },

  canInviteToForum() {
    return Discourse.User.currentProp('can_invite_to_forum');
  },

  toggleBookmark() {
    this.state.bookmarked = !this.state.bookmarked
    const topicController = this.register.lookup('controller:topic')
    topicController.send('toggleBookmark')
  },

  sendShowLogin() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showLogin');
  },

  sendShowCreateAccount() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showCreateAccount');
  },

  showInvite() {
    const topicRoute = this.register.lookup('route:topic');
    topicRoute.send('showLogin');
  },

  createTopic() {
    const cController = this.register.lookup('controller:composer');
    const dtController = this.register.lookup('controller:discovery/topics');
    cController.open({
      categoryId: dtController.get('category.id'),
      action: Composer.CREATE_TOPIC,
      draftKey: dtController.get('model.draft_key'),
      draftSequence: dtController.get('model.draft_sequence')
    });
  },

  html(attrs, state) {
    const { currentUser } = this;
    const topic = state.topic;
    const cate = attrs.category;
    var days;
    var count;
    const category = attrs.category;
    let contents = [];
    

    const path = getOwner(this).lookup('controller:application').get('currentPath');

    var v1 = 0, size = 0;
    var unread = 0;
    var data = Discourse.Category.list();
    if (path == "discovery.latest" || path == "discovery.top")
    {
        contents.push(h("h2.novatitle", [h("a.what", {attributes:{href: "/t/%DA%86%DA%AF%D9%88%D9%86%D9%87%E2%80%8C-%D9%85%DB%8C%D8%AA%D9%88%D8%A7%D9%86%D9%85-%D8%A2%D8%BA%D8%A7%D8%B2%DA%AF%D8%B1-%D9%86%D9%88%D8%A2%D9%88%D8%B1%DB%8C-%D8%AC%D9%85%D8%B9%DB%8C-%D8%A8%D8%A7%D8%B4%D9%85%D8%9F/2852"}}, " نوآ"), " های آینده"]));
         for (var i = 0 ; i < data.length ; i++) 
        {
            if (data[i].slug[0] == "f" && data[i].slug[1] == "u" && data[i].slug[2] == "t" && data[i].slug[3] == "u" && data[i].slug[4] == "r" && data[i].slug[5] == "e") 
            {
                var url;
                var name = data[i].slug.substring(7);
                var color = Discourse.Category.findBySlug(data[i].slug).color;
                if (Discourse.Category.findBySlug(data[i].slug).uploaded_logo) 
                {
                  url = Discourse.Category.findBySlug(data[i].slug).uploaded_logo.url;
                }
                else
                  url = "/uploads/default/original/2X/b/b0f2632cc41f8568abafec7218140e4a46efcbac.png";
                contents.push(h("div.future-nova",{attributes: {style : "background-color: #" + color + ";"}}, [h("a", {attributes:{href:"/c/" + data[i].slug}},[h("h2", data[i].name),h("img.nova-medium",{attributes:{src: url}})]),h("button.PayPingCheckout", {attributes:{onclick:name+"()"}}, "حمایت")]));

            //contents.push();
            }
        }
    }
    else if (cate && topic == undefined) 
    {
      if (cate.slug[0] == "f" && cate.slug[1] == "u" && cate.slug[2] == "t" && cate.slug[3] == "u" && cate.slug[4] == "r" && cate.slug[5] == "e") 
      {
          var name = cate.slug.substring(7);
          contents.push(h("button.PayPingCheckout", {attributes:{onclick:name+"()"}}, "حمایت"));
           contents.push(this.attach('category-notifications-button', {
          className: 'btn widget-button',
          category: category,
          showFullTitle: false
        }));
       }
     }
    
    return h('div.widget-inner', contents);
  }

});
