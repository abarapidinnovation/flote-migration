import { AdCampaigns } from '../entities/AdCampaigns'
import { AdClicks } from '../entities/AdClicks'
import { AdCredits } from '../entities/AdCredits'
import { Adds } from '../entities/Adds'
import { AdImpressions } from '../entities/AdImpressions'
import { AdminAlerts } from '../entities/AdminAlerts'
import { AdPlacements } from '../entities/AdPlacements'
import { Ads } from '../entities/Ads'
import { ArInternalMetadata } from '../entities/ArInternalMetadata'
import { AuthenticatedAccounts } from '../entities/AuthenticatedAccounts'
import { AverageTransactionFees } from '../entities/AverageTransactionFees'
import { BitcoinAddressBackups } from '../entities/BitcoinAddressBackups'
import { BitcoinAddresses } from '../entities/BitcoinAddresses'
import { BitcoinPurchases } from '../entities/BitcoinPurchases'
import { BitcoinWallets } from '../entities/BitcoinWallets'
import { Blocks } from '../entities/Blocks'
import { Boards } from '../entities/Boards'
import { Channels } from '../entities/Channels'
import { Comments } from '../entities/Comments'
import { Contacts } from '../entities/Contacts'
import { Conversations } from '../entities/Conversations'
import { ConversationUsers } from '../entities/ConversationUsers'
import { DeletedUserBackups } from '../entities/DeletedUserBackups'
import { DeliveryAddresses } from '../entities/DeliveryAddresses'
import { Events } from '../entities/Events'
import { FacebookImports } from '../entities/FacebookImports'
import { Files } from '../entities/Files'
import { Filters } from '../entities/Filters'
import { HiddenHashtags } from '../entities/HiddenHashtags'
import { Invites } from '../entities/Invites'
import { Invoices } from '../entities/Invoices'
import { IrrelevantWords } from '../entities/IrrelevantWords'
import { Likes } from '../entities/Likes'
import { ListBlocks } from '../entities/ListBlocks'
import { ListMemberships } from '../entities/ListMemberships'
import { Lists } from '../entities/Lists'
import { ListSubscriptions } from '../entities/ListSubscriptions'
import { Livestreams } from '../entities/Livestreams'
import { LivestreamViewers } from '../entities/LivestreamViewers'
import { MediaThumbnails } from '../entities/MediaThumbnails'
import { Messages } from '../entities/Messages'
import { MessageUploads } from '../entities/MessageUploads'
import { Metrics } from '../entities/Metrics'
import { Notifications } from '../entities/Notifications'
import { OldSenderKeys } from '../entities/OldSenderKeys'
import { PaymentAddresses } from '../entities/PaymentAddresses'
import { Payments } from '../entities/Payments'
import { PostBoosts } from '../entities/PostBoosts'
import { Posts } from '../entities/Posts'
import { PostUploads } from '../entities/PostUploads'
import { ProductInventories } from '../entities/ProductInventories'
import { Products } from '../entities/Products'
import { ProductUploads } from '../entities/ProductUploads'
import { PurchaseOrders } from '../entities/PurchaseOrders'
import { PurchaseOrderSupports } from '../entities/PurchaseOrderSupports'
import { Purchases } from '../entities/Purchases'
import { Reports } from '../entities/Reports'
import { Reposts } from '../entities/Reposts'
import { Rulings } from '../entities/Rulings'
import { SchemaMigrations } from '../entities/SchemaMigrations'
import { SenderKeys } from '../entities/SenderKeys'
import { ShippingRates } from '../entities/ShippingRates'
import { SubscriptionRequests } from '../entities/SubscriptionRequests'
import { Subscriptions } from '../entities/Subscriptions'
import { SupportPayments } from '../entities/SupportPayments'
import { Supports } from '../entities/Supports'
import { Tiers } from '../entities/Tiers'
import { TokenCredits } from '../entities/TokenCredits'
import { TransactionInputs } from '../entities/TransactionInputs'
import { TransactionOutputs } from '../entities/TransactionOutputs'
import { Transactions } from '../entities/Transactions'
import { Unfollows } from '../entities/Unfollows'
import { Uploads } from '../entities/Uploads'
import { UrlMetadata } from '../entities/UrlMetadata'
import { Users } from '../entities/Users'
import { UserLogs } from '../entities/UserLogs'
import { Views } from '../entities/Views'
import { Votes } from '../entities/Votes'
import { WyreTransactions } from '../entities/WyreTransactions'

import { createConnections, getConnection } from 'typeorm'
import 'dotenv/config'

const entities = [AdCampaigns, AdClicks, AdCredits, Adds, AdImpressions, AdminAlerts, AdPlacements, Ads, ArInternalMetadata, AuthenticatedAccounts, AverageTransactionFees,
BitcoinAddressBackups, BitcoinAddresses, BitcoinPurchases, BitcoinWallets, Blocks, Boards, Channels, Comments, Contacts, Conversations, ConversationUsers, DeletedUserBackups,
DeliveryAddresses, Events, FacebookImports, Files, Filters, HiddenHashtags, Invites, Invoices, IrrelevantWords, Likes, ListBlocks, ListMemberships, Lists, ListSubscriptions,
Livestreams, LivestreamViewers, MediaThumbnails, Messages, MessageUploads, Metrics, Notifications, OldSenderKeys, PaymentAddresses, Payments, PostBoosts, Posts, 
PostUploads, ProductInventories, Products, ProductInventories, PurchaseOrders, PurchaseOrderSupports, Purchases, Reports, Reposts, Rulings, SchemaMigrations, SenderKeys,
ShippingRates, SubscriptionRequests, Subscriptions, SupportPayments, Supports, Tiers, TokenCredits, TransactionInputs, TransactionOutputs, Transactions, Unfollows, Uploads, UrlMetadata,
UserLogs, Users, Views, Votes, WyreTransactions]

async function insertData(repository, table) {

  const conn = await createConnections([{
    name: 'default',
    type: 'mysql',
    host: process.env['MYSQL_HOST'],
    port: +process.env['MYSQL_PORT'],
    username: process.env['MYSQL_USERNAME'],
    password: process.env['MYSQL_PASSWORD'],
    database: process.env['MYSQL_DATABASE'],
    entities: [...entities]
  }, {
      name: 'pg-connection',
      type: 'postgres',
      host: process.env['POSTGRESQL_HOST'],
      port: +process.env['POSTGRESQL_PORT'],
      username: process.env['POSTGRESQL_USERNAME'],
      password: process.env['POSTGRESQL_PASSWORD'],
      database: process.env['POSTGRESQL_DATABASE'],
      entities: [...entities]
  }])

  const pgConnection = getConnection("pg-connection")
  const mysqlConnection = getConnection('default')

  const result = await pgConnection.query('SELECT * FROM ' + table)
  await mysqlConnection.getRepository(repository).createQueryBuilder(table).insert().values(result).execute()

  console.log(`${table} done---->`)

  conn[0].close()
  conn[1].close()
}

async function lessDataTables() {
  await insertData(AdCampaigns, 'ad_campaigns')
  await insertData(AdClicks, 'ad_clicks')
  await insertData(AdCredits, 'ad_credits')
  await insertData(Adds, 'adds')
  await insertData(AdImpressions, 'ad_impressions')
  await insertData(AdminAlerts, 'admin_alerts')
  await insertData(AdPlacements, 'ad_placements')
  await insertData(Ads, 'ads')
  await insertData(ArInternalMetadata, 'ar_internal_metadata')
  await insertData(AuthenticatedAccounts, 'authenticated_accounts')
  await insertData(AverageTransactionFees, 'average_transaction_fees')
  await insertData(BitcoinAddressBackups, 'bitcoin_address_backups')
  await insertData(BitcoinAddresses, 'bitcoin_addresses')
  await insertData(BitcoinPurchases, 'bitcoin_purchases')
  await insertData(BitcoinWallets, 'bitcoin_wallets')
  await insertData(Blocks, 'blocks')
  await insertData(Boards, 'boards')
  await insertData(Channels, 'channels')
  await insertData(Comments, 'comments')
  await insertData(Contacts, 'contacts')
  await insertData(Conversations, 'conversations')
  await insertData(ConversationUsers, 'conversation_users')
  await insertData(DeletedUserBackups, 'deleted_user_backups')
  await insertData(DeliveryAddresses, 'delivery_addresses')
  await insertData(Events, 'events')
  await insertData(FacebookImports, 'facebook_imports')
  await insertData(Files, 'files')
  await insertData(Filters, 'filters')
  await insertData(HiddenHashtags, 'hidden_hashtags')
  await insertData(Invites, 'invites')
  await insertData(Invoices, 'invoices')
  await insertData(IrrelevantWords, 'irrelevant_words')
  await insertData(Likes, 'likes')
  await insertData(ListBlocks, 'list_blocks')
  await insertData(ListMemberships, 'list_memberships')
  await insertData(Lists, 'lists')
  await insertData(ListSubscriptions, 'list_subscriptions')
  await insertData(Livestreams, 'livestreams')
  await insertData(LivestreamViewers, 'livestream_viewers')
  await insertData(MediaThumbnails, 'media_thumbnails')
  await insertData(Messages, 'messages')
  await insertData(MessageUploads, 'message_uploads')
  await insertData(Metrics, 'metrics')
  await insertData(Notifications, 'notifications')
  await insertData(OldSenderKeys, 'old_sender_keys')
  await insertData(PaymentAddresses, 'payment_addresses')
  await insertData(Payments, 'payments')
  await insertData(PostBoosts, 'post_boosts')
  await insertData(PostUploads, 'post_uploads')
  await insertData(ProductInventories, 'product_inventories')
  await insertData(Products, 'products')
  await insertData(ProductUploads, 'product_uploads')
  await insertData(PurchaseOrders, 'purchase_orders')
  await insertData(PurchaseOrderSupports, 'purchase_order_supports')
  await insertData(Purchases, 'purchases')
  await insertData(Reports, 'reports')
  await insertData(Reposts, 'reposts')
  await insertData(Rulings, 'rulings')
  await insertData(SchemaMigrations, 'schema_migrations')
  await insertData(SenderKeys, 'sender_keys')
  await insertData(ShippingRates, 'shipping_rates')
  await insertData(SubscriptionRequests, 'subscription_requests')
  await insertData(Subscriptions, 'subscriptions')
  await insertData(SupportPayments, 'support_payments')
  await insertData(Supports, 'supports')
  await insertData(Tiers, 'tiers')
  await insertData(TokenCredits, 'token_credits')
  await insertData(TransactionInputs, 'transaction_inputs')
  await insertData(TransactionOutputs, 'transaction_outputs')
  await insertData(Transactions, 'transactions')
  await insertData(Unfollows, 'unfollows')
  await insertData(Uploads, 'uploads')
  await insertData(UrlMetadata, 'url_metadata')
  await insertData(UserLogs, 'user_logs')
  await insertData(Users, 'users')
  await insertData(Views, 'views')
  await insertData(Votes, 'votes')
  await insertData(WyreTransactions, 'wyre_transactions')

  console.log('Done----------------->')
}

lessDataTables()

async function insertPosts() {
  await insertData(Posts, 'posts')
}

insertPosts()

