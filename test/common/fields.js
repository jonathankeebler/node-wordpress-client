if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/common/fields.js'] === 'undefined'){_$jscoverage['lib/common/fields.js']=[];
_$jscoverage['lib/common/fields.js'].source=['\'use strict\';',
'',
'var maps = {};',
'',
'function extend( a, b ) {',
'	for ( var p in b ) {',
'		a[ p ] = b[ p ];',
'	}',
'',
'	return a;',
'}',
'',
'function createFieldMaps( renames, toFns, fromFns ) {',
'	var to = extend( {}, renames ),',
'		from = {};',
'',
'	Object.keys( renames ).forEach(function( key ) {',
'		from[ renames[ key ] ] = key;',
'	});',
'',
'	return {',
'		renames: renames,',
'		to: extend( to, toFns ),',
'		from: extend( from, fromFns )',
'	};',
'}',
'',
'function mapFields( data, map ) {',
'	var field, value, mappedField,',
'		ret = {};',
'',
'	for ( field in data ) {',
'		value = data[ field ];',
'		mappedField = map[ field ];',
'',
'		// no map -> delete',
'		if ( !mappedField ) {',
'			continue;',
'		// string -> change field name',
'		} else if ( typeof mappedField === "string" ) {',
'			ret[ mappedField ] = value;',
'		// function -> merge result',
'		} else {',
'			extend( ret, mappedField( value ) );',
'		}',
'	}',
'',
'	return ret;',
'}',
'',
'maps.labels = createFieldMaps({',
'	addNewItem: "add_new_item",',
'	addOrRemoveItems: "add_or_remove_items",',
'	allItems: "all_items",',
'	chooseFromMostUsed: "choose_from_most_used",',
'	editItem: "edit_item",',
'	menuName: "menu_name",',
'	name: "name",',
'	nameAdminBar: "name_admin_bar",',
'	newItemName: "new_item_name",',
'	parentItem: "parent_item",',
'	parentItemColon: "parent_item_colon",',
'	popularItems: "popular_items",',
'	searchItems: "search_items",',
'	separateItemsWithCommas: "separate_items_with_commas",',
'	singularName: "singular_name",',
'	updateItem: "update_item",',
'	viewItem: "view_item"',
'});',
'',
'maps.post = createFieldMaps({',
'	author: /* int */ "post_author",',
'	commentStatus: /* string */ "comment_status",',
'	content: /* string */ "post_content",',
'	customFields: /* array */ "custom_fields",',
'	date: /* datetime */ "post_date",',
'	excerpt: /* string */ "post_excerpt",',
'	format: /* string */"post_format",',
'	id: /* string */ "post_id", /* readonly */',
'	link: /* string */ "link" /* readonly */,',
'	modified: /* datetime */ "post_modified",',
'	menuOrder: /* int */ "menu_order",',
'	name: /* string */ "post_name",',
'	pageTemplate: /* string */ "page_template",',
'	parent: /* int */ "post_parent",',
'	password: /* string */ "post_password",',
'	pingStatus: /* string */ "ping_status",',
'	status: /* string */ "post_status",',
'	sticky: /* bool */ "sticky",',
'	terms: /* struct */ "terms" /* array */,',
'	termNames: /* struct */ "terms_names",',
'	thumbnail: /* int */ "post_thumbnail",',
'	title: /* string */ "post_title",',
'	type: /* string */ "post_type"',
'}, {}, {',
'	post_date_gmt: /* datetime */ function( date ) {',
'		return {',
'			date: new Date( date )',
'		};',
'	},',
'	post_modified_gmt: /* datetime */ function( date ) {',
'		return {',
'			modified: new Date( date )',
'		};',
'	}',
'});',
'',
'maps.postType = createFieldMaps({',
'	cap: /* struct */ "cap",',
'	capabilityType: /* string */ "capability_type",',
'	description: /* string */ "description",',
'	_editLink: /* string */ "_edit_link",',
'	excludeFromSearch: /* bool */ "exclude_from_search",',
'	hasArchive: /* bool */ "has_archive",',
'	heirarchical: /* bool */ "heirarchical",',
'	label: /* string */ "label",',
'	labels: /* struct */ "labels",',
'	mapMetaCap: /* bool */ "map_meta_cap",',
'	menuIcon: /* string */ "menu_icon",',
'	menuPosition: /* int */ "menu_position",',
'	name: /* string */ "name",',
'	"public": /* bool */ "public",',
'	publiclyQuerably: /* bool */ "publicly_queryable",',
'	queryVar: /* mixed */ "query_var",',
'	rewrite: /* mixed */ "rewrite",',
'	showInAdminBar: /* bool */ "show_in_admin_bar",',
'	showInMenu: /* bool */ "show_in_menu",',
'	showInNavMenus: /* bool */ "show_in_nav_menus",',
'	showUi: /* bool */ "show_ui",',
'	supports: /* array */ "supports",',
'	taxonomies: /* array */ "taxonomies"',
'}, {}, {',
'	cap: function( cap ) {',
'		return { cap: mapFields( cap, maps.postTypeCap.from ) };',
'	},',
'	labels: function( labels ) {',
'		return { labels: mapFields( labels, maps.labels.from ) };',
'	}',
'});',
'',
'maps.postTypeCap = createFieldMaps({',
'	deleteOthersPosts: /* string */ "delete_others_posts",',
'	deletePost: /* string */ "delete_post",',
'	deletePosts: /* string */ "delete_posts",',
'	deletePrivatePosts: /* string */ "delete_private_posts",',
'	deletePublishedPosts: /* string */ "delete_published_posts",',
'	editOthersPosts: /* string */ "edit_others_posts",',
'	editPost: /* string */ "edit_post",',
'	editPosts: /* string */ "edit_posts",',
'	editPrivatePosts: /* string */ "edit_private_posts",',
'	editPublishedPosts: /* string */ "edit_published_posts",',
'	publishPosts: /* string */ "publish_posts",',
'	read: /* string */ "read",',
'	readPost: /* sring */ "read_post",',
'	readPrivatePosts: /* string */ "read_private_posts"',
'});',
'',
'maps.taxonomy = createFieldMaps({',
'	cap: /* struct */ "cap",',
'	heirarchical: /* bool */ "heirarchical",',
'	name: /* string */ "name",',
'	label: /* string */ "label",',
'	labels: /* struct */ "labels",',
'	objectType: /* array */ "object_type",',
'	"public": /* bool */ "public",',
'	queryVar: /* string */ "query_var",',
'	rewrite: /* struct */ "rewrite",',
'	showInNavMenus: /* bool */ "show_in_nav_menus",',
'	showTagCloud: /* bool */ "show_tagcloud",',
'	showUi: /* bool */ "show_ui"',
'}, {}, {',
'	cap: function( cap ) {',
'		return { cap: mapFields( cap, maps.taxonomyCap.from ) };',
'	},',
'	labels: function( labels ) {',
'		return { labels: mapFields( labels, maps.labels.from ) };',
'	}',
'});',
'',
'maps.taxonomyCap = createFieldMaps({',
'	assignTerms: /* string */ "assign_terms",',
'	deleteTerms: /* string */ "delete_terms",',
'	editTerms: /* string */ "edit_terms",',
'	manageTerms: /* string */ "manage_terms"',
'});',
'',
'maps.term = createFieldMaps({',
'	count: /* int */ "count", /* readonly */',
'	description: /* string */ "description",',
'	name: /* string */ "name",',
'	parent: /* string */ "parent",',
'	slug: /* string */ "slug",',
'	taxonomy: /* string */ "taxonomy",',
'	termId: /* string */ "term_id", /* readonly */',
'	termTaxonomyId: /* string */ "term_taxonomy_id" /* readonly */',
'});',
'',
'module.exports = {',
'	to: function( data, type ) {',
'		return mapFields( data, maps[ type ].to );',
'	},',
'	from: function( data, type ) {',
'		return mapFields( data, maps[ type ].from );',
'	},',
'	array: function( data, type ) {',
'		var map = maps[ type ].renames;',
'		return data.map(function( field ) {',
'			return map[ field ];',
'		});',
'	}',
'};',
''];
_$jscoverage['lib/common/fields.js'][48]=0;
_$jscoverage['lib/common/fields.js'][1]=0;
_$jscoverage['lib/common/fields.js'][28]=0;
_$jscoverage['lib/common/fields.js'][7]=0;
_$jscoverage['lib/common/fields.js'][6]=0;
_$jscoverage['lib/common/fields.js'][5]=0;
_$jscoverage['lib/common/fields.js'][3]=0;
_$jscoverage['lib/common/fields.js'][102]=0;
_$jscoverage['lib/common/fields.js'][18]=0;
_$jscoverage['lib/common/fields.js'][17]=0;
_$jscoverage['lib/common/fields.js'][13]=0;
_$jscoverage['lib/common/fields.js'][10]=0;
_$jscoverage['lib/common/fields.js'][14]=0;
_$jscoverage['lib/common/fields.js'][137]=0;
_$jscoverage['lib/common/fields.js'][34]=0;
_$jscoverage['lib/common/fields.js'][21]=0;
_$jscoverage['lib/common/fields.js'][29]=0;
_$jscoverage['lib/common/fields.js'][33]=0;
_$jscoverage['lib/common/fields.js'][32]=0;
_$jscoverage['lib/common/fields.js'][173]=0;
_$jscoverage['lib/common/fields.js'][37]=0;
_$jscoverage['lib/common/fields.js'][176]=0;
_$jscoverage['lib/common/fields.js'][44]=0;
_$jscoverage['lib/common/fields.js'][40]=0;
_$jscoverage['lib/common/fields.js'][41]=0;
_$jscoverage['lib/common/fields.js'][38]=0;
_$jscoverage['lib/common/fields.js'][180]=0;
_$jscoverage['lib/common/fields.js'][134]=0;
_$jscoverage['lib/common/fields.js'][108]=0;
_$jscoverage['lib/common/fields.js'][71]=0;
_$jscoverage['lib/common/fields.js'][97]=0;
_$jscoverage['lib/common/fields.js'][51]=0;
_$jscoverage['lib/common/fields.js'][141]=0;
_$jscoverage['lib/common/fields.js'][158]=0;
_$jscoverage['lib/common/fields.js'][187]=0;
_$jscoverage['lib/common/fields.js'][198]=0;
_$jscoverage['lib/common/fields.js'][200]=0;
_$jscoverage['lib/common/fields.js'][203]=0;
_$jscoverage['lib/common/fields.js'][206]=0;
_$jscoverage['lib/common/fields.js'][207]=0;
_$jscoverage['lib/common/fields.js'][208]=0;
}_$jscoverage['lib/common/fields.js'][1]++;
'use strict';

_$jscoverage['lib/common/fields.js'][3]++;
var maps = {};

_$jscoverage['lib/common/fields.js'][5]++;
function extend( a, b ) {
	_$jscoverage['lib/common/fields.js'][6]++;
for ( var p in b ) {
		_$jscoverage['lib/common/fields.js'][7]++;
a[ p ] = b[ p ];
	}

	_$jscoverage['lib/common/fields.js'][10]++;
return a;
}

_$jscoverage['lib/common/fields.js'][13]++;
function createFieldMaps( renames, toFns, fromFns ) {
	_$jscoverage['lib/common/fields.js'][14]++;
var to = extend( {}, renames ),
		from = {};

	_$jscoverage['lib/common/fields.js'][17]++;
Object.keys( renames ).forEach(function( key ) {
		_$jscoverage['lib/common/fields.js'][18]++;
from[ renames[ key ] ] = key;
	});

	_$jscoverage['lib/common/fields.js'][21]++;
return {
		renames: renames,
		to: extend( to, toFns ),
		from: extend( from, fromFns )
	};
}

_$jscoverage['lib/common/fields.js'][28]++;
function mapFields( data, map ) {
	_$jscoverage['lib/common/fields.js'][29]++;
var field, value, mappedField,
		ret = {};

	_$jscoverage['lib/common/fields.js'][32]++;
for ( field in data ) {
		_$jscoverage['lib/common/fields.js'][33]++;
value = data[ field ];
		_$jscoverage['lib/common/fields.js'][34]++;
mappedField = map[ field ];

		// no map -> delete
		_$jscoverage['lib/common/fields.js'][37]++;
if ( !mappedField ) {
			_$jscoverage['lib/common/fields.js'][38]++;
continue;
		// string -> change field name
		} else {
_$jscoverage['lib/common/fields.js'][40]++;
if ( typeof mappedField === "string" ) {
			_$jscoverage['lib/common/fields.js'][41]++;
ret[ mappedField ] = value;
		// function -> merge result
		} else {
			_$jscoverage['lib/common/fields.js'][44]++;
extend( ret, mappedField( value ) );
		}}

	}

	_$jscoverage['lib/common/fields.js'][48]++;
return ret;
}

_$jscoverage['lib/common/fields.js'][51]++;
maps.labels = createFieldMaps({
	addNewItem: "add_new_item",
	addOrRemoveItems: "add_or_remove_items",
	allItems: "all_items",
	chooseFromMostUsed: "choose_from_most_used",
	editItem: "edit_item",
	menuName: "menu_name",
	name: "name",
	nameAdminBar: "name_admin_bar",
	newItemName: "new_item_name",
	parentItem: "parent_item",
	parentItemColon: "parent_item_colon",
	popularItems: "popular_items",
	searchItems: "search_items",
	separateItemsWithCommas: "separate_items_with_commas",
	singularName: "singular_name",
	updateItem: "update_item",
	viewItem: "view_item"
});

_$jscoverage['lib/common/fields.js'][71]++;
maps.post = createFieldMaps({
	author: /* int */ "post_author",
	commentStatus: /* string */ "comment_status",
	content: /* string */ "post_content",
	customFields: /* array */ "custom_fields",
	date: /* datetime */ "post_date",
	excerpt: /* string */ "post_excerpt",
	format: /* string */"post_format",
	id: /* string */ "post_id", /* readonly */
	link: /* string */ "link" /* readonly */,
	modified: /* datetime */ "post_modified",
	menuOrder: /* int */ "menu_order",
	name: /* string */ "post_name",
	pageTemplate: /* string */ "page_template",
	parent: /* int */ "post_parent",
	password: /* string */ "post_password",
	pingStatus: /* string */ "ping_status",
	status: /* string */ "post_status",
	sticky: /* bool */ "sticky",
	terms: /* struct */ "terms" /* array */,
	termNames: /* struct */ "terms_names",
	thumbnail: /* int */ "post_thumbnail",
	title: /* string */ "post_title",
	type: /* string */ "post_type"
}, {}, {
	post_date_gmt: /* datetime */ function( date ) {
		_$jscoverage['lib/common/fields.js'][97]++;
return {
			date: new Date( date )
		};
	},
	post_modified_gmt: /* datetime */ function( date ) {
		_$jscoverage['lib/common/fields.js'][102]++;
return {
			modified: new Date( date )
		};
	}
});

_$jscoverage['lib/common/fields.js'][108]++;
maps.postType = createFieldMaps({
	cap: /* struct */ "cap",
	capabilityType: /* string */ "capability_type",
	description: /* string */ "description",
	_editLink: /* string */ "_edit_link",
	excludeFromSearch: /* bool */ "exclude_from_search",
	hasArchive: /* bool */ "has_archive",
	heirarchical: /* bool */ "heirarchical",
	label: /* string */ "label",
	labels: /* struct */ "labels",
	mapMetaCap: /* bool */ "map_meta_cap",
	menuIcon: /* string */ "menu_icon",
	menuPosition: /* int */ "menu_position",
	name: /* string */ "name",
	"public": /* bool */ "public",
	publiclyQuerably: /* bool */ "publicly_queryable",
	queryVar: /* mixed */ "query_var",
	rewrite: /* mixed */ "rewrite",
	showInAdminBar: /* bool */ "show_in_admin_bar",
	showInMenu: /* bool */ "show_in_menu",
	showInNavMenus: /* bool */ "show_in_nav_menus",
	showUi: /* bool */ "show_ui",
	supports: /* array */ "supports",
	taxonomies: /* array */ "taxonomies"
}, {}, {
	cap: function( cap ) {
		_$jscoverage['lib/common/fields.js'][134]++;
return { cap: mapFields( cap, maps.postTypeCap.from ) };
	},
	labels: function( labels ) {
		_$jscoverage['lib/common/fields.js'][137]++;
return { labels: mapFields( labels, maps.labels.from ) };
	}
});

_$jscoverage['lib/common/fields.js'][141]++;
maps.postTypeCap = createFieldMaps({
	deleteOthersPosts: /* string */ "delete_others_posts",
	deletePost: /* string */ "delete_post",
	deletePosts: /* string */ "delete_posts",
	deletePrivatePosts: /* string */ "delete_private_posts",
	deletePublishedPosts: /* string */ "delete_published_posts",
	editOthersPosts: /* string */ "edit_others_posts",
	editPost: /* string */ "edit_post",
	editPosts: /* string */ "edit_posts",
	editPrivatePosts: /* string */ "edit_private_posts",
	editPublishedPosts: /* string */ "edit_published_posts",
	publishPosts: /* string */ "publish_posts",
	read: /* string */ "read",
	readPost: /* sring */ "read_post",
	readPrivatePosts: /* string */ "read_private_posts"
});

_$jscoverage['lib/common/fields.js'][158]++;
maps.taxonomy = createFieldMaps({
	cap: /* struct */ "cap",
	heirarchical: /* bool */ "heirarchical",
	name: /* string */ "name",
	label: /* string */ "label",
	labels: /* struct */ "labels",
	objectType: /* array */ "object_type",
	"public": /* bool */ "public",
	queryVar: /* string */ "query_var",
	rewrite: /* struct */ "rewrite",
	showInNavMenus: /* bool */ "show_in_nav_menus",
	showTagCloud: /* bool */ "show_tagcloud",
	showUi: /* bool */ "show_ui"
}, {}, {
	cap: function( cap ) {
		_$jscoverage['lib/common/fields.js'][173]++;
return { cap: mapFields( cap, maps.taxonomyCap.from ) };
	},
	labels: function( labels ) {
		_$jscoverage['lib/common/fields.js'][176]++;
return { labels: mapFields( labels, maps.labels.from ) };
	}
});

_$jscoverage['lib/common/fields.js'][180]++;
maps.taxonomyCap = createFieldMaps({
	assignTerms: /* string */ "assign_terms",
	deleteTerms: /* string */ "delete_terms",
	editTerms: /* string */ "edit_terms",
	manageTerms: /* string */ "manage_terms"
});

_$jscoverage['lib/common/fields.js'][187]++;
maps.term = createFieldMaps({
	count: /* int */ "count", /* readonly */
	description: /* string */ "description",
	name: /* string */ "name",
	parent: /* string */ "parent",
	slug: /* string */ "slug",
	taxonomy: /* string */ "taxonomy",
	termId: /* string */ "term_id", /* readonly */
	termTaxonomyId: /* string */ "term_taxonomy_id" /* readonly */
});

_$jscoverage['lib/common/fields.js'][198]++;
module.exports = {
	to: function( data, type ) {
		_$jscoverage['lib/common/fields.js'][200]++;
return mapFields( data, maps[ type ].to );
	},
	from: function( data, type ) {
		_$jscoverage['lib/common/fields.js'][203]++;
return mapFields( data, maps[ type ].from );
	},
	array: function( data, type ) {
		_$jscoverage['lib/common/fields.js'][206]++;
var map = maps[ type ].renames;
		_$jscoverage['lib/common/fields.js'][207]++;
return data.map(function( field ) {
			_$jscoverage['lib/common/fields.js'][208]++;
return map[ field ];
		});
	}
};
