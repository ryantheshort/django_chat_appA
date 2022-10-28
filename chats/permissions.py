from rest_framework import permissions

class IsOwnerOrAdminOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only aallow owners of an objct to edit it.
    Owners and admin useres may delete it.
    Assumes the model instance has an 'user' attribute.   
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request.
        # so we'll always allow GET, HEAD, or OPTIONS requests..
        if request.method in permissions.SAFE_METHODS:
            return True
        # Instance must haave an attribute named 'user'.
        elif request.method == 'delete':
            return obj.user == request.user or request.user.is_staff
        return obj.user == request.user

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_staff