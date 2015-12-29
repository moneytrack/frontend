package ru.koluch.wordlist

import com.google.appengine.api.datastore.*
import com.google.appengine.api.datastore.FetchOptions.Builder
import com.google.appengine.api.datastore.FetchOptions.Builder.*
import com.google.appengine.api.users.UserService
import com.google.appengine.api.users.UserServiceFactory
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Copyright (c) 2015 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 29.12.2015 02:30
 */

val USER_KIND = "User";
val USER_PROP_NAME = "name"

class AuthServlet: HttpServlet() {
    override fun service(req: HttpServletRequest, res: HttpServletResponse) {
        val userService = UserServiceFactory.getUserService();

        val thisURL = req.requestURI;

        res.contentType = "text/html";
        val userPrincipal = req.userPrincipal
        if (userPrincipal != null) {
            res.writer.println("<p>Hello, " +
                    userPrincipal.name +
                    "!  You can <a href=\"" +
                    userService.createLogoutURL(thisURL) +
                    "\">sign out</a>.</p>");

            val datastore = DatastoreServiceFactory.getDatastoreService()
            if(!datastore.exists(KeyFactory.createKey(USER_KIND, userPrincipal.name))) {
                val newUserEntity = Entity(USER_KIND, userPrincipal.name)
                newUserEntity.key
                datastore.put(newUserEntity)
                res.writer.println("<p>Account was created for this user</p>")
            }

        } else {
            res.writer.println("<p>Please <a href=\"" +
                    userService.createLoginURL(thisURL) +
                    "\">sign in</a>.</p>");
        }
    }
}