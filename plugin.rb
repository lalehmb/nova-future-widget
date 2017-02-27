# name: nova-future
# about: A widget to shows future nova
# version: 0.1
# authors: SMHassanAlavi
register_asset 'stylesheets/user-widget.scss'

# add_admin_route 'nova_widget.title', 'nova-widget'

# Discourse::Application.routes.append do
#   get '/admin/plugins/nova-widget' => 'admin/plugins#index', constraints: StaffConstraint.new
# end

after_initialize do
  SiteSetting.class_eval do
    @choices[:layouts_sidebar_right_widgets].push('nova-future')
  end
end
