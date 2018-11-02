/*  account info */
CREATE TABLE IF NOT EXISTS  `account_official` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`account` varchar(50) NOT NULL DEFAULT '',
`password` varchar(32)  NOT NULL DEFAULT '',
`createTime` bigint(20) unsigned NOT NULL DEFAULT '0',
`activated` int(10) unsigned NOT NULL DEFAULT '0',
`activateTime` bigint(20) unsigned NOT NULL DEFAULT '0',
`miId` varchar(50) NOT NULL DEFAULT '',
`roleName` varchar(50) NOT NULL DEFAULT '',
`phone` varchar(15) NOT NULL DEFAULT '',
 PRIMARY KEY (`id`),
 UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
