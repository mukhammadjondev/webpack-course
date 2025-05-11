import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import webpack, { type Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface Env {
  mode: 'development' | 'production';
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env: Env) => {
  const devServer: DevServerConfiguration = {
    port: 3000,
    open: true,
    hot: true,
    compress: true,
  };

  const config: Configuration = {
    mode: env.mode || 'development',
    entry: path.resolve(__dirname, 'src', 'main.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].bundle.js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      env.mode === 'development' && new webpack.ProgressPlugin(),
      new DotenvPlugin({
        path: path.resolve(__dirname, `.env.${env.mode}`),
      }),
      env.mode === 'production' &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[id].[contenthash].css',
        }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/i,
          use: [
            env.mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: env.mode === 'development' ? devServer : undefined,
    devtool: env.mode === 'development' ? 'inline-source-map' : false,
  };

  return config;
};
