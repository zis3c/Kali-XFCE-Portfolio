import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import AsciiWaveBg from './AsciiWaveBg';

interface MockContext {
  scale: jest.Mock;
  setTransform?: jest.Mock;
  clearRect: jest.Mock;
  fillText: jest.Mock;
  font: string;
  fillStyle: string;
  textAlign: string;
  textBaseline: string;
}

const makeContext = (): MockContext => ({
  scale: jest.fn(),
  clearRect: jest.fn(),
  fillText: jest.fn(),
  font: '',
  fillStyle: '',
  textAlign: '',
  textBaseline: '',
});

let context: MockContext;
let frameCallback: FrameRequestCallback | null = null;

describe('AsciiWaveBg', () => {
  const originalWidth = window.innerWidth;
  const originalHeight = window.innerHeight;
  const originalDpr = window.devicePixelRatio;

  beforeEach(() => {
    context = makeContext();
    frameCallback = null;
    window.innerWidth = 800;
    window.innerHeight = 600;
    window.devicePixelRatio = 2;
    jest
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue(context as unknown as CanvasRenderingContext2D);
    window.requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
      frameCallback = callback;
      return 1;
    });
    window.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.innerWidth = originalWidth;
    window.innerHeight = originalHeight;
    window.devicePixelRatio = originalDpr;
  });

  it('renders and animates the ASCII wave canvas', () => {
    context.setTransform = jest.fn();
    const wrap = mount(<AsciiWaveBg themeMode="terminal" />);

    expect(context.fillText).toHaveBeenCalled();
    expect(context.fillStyle).toBe('#a1a1aa');
    expect(context.setTransform).toHaveBeenCalled();

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 100, clientY: 120 })
      );
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 180, clientY: 160 })
      );
      window.dispatchEvent(new MouseEvent('mouseleave'));
      window.dispatchEvent(new Event('resize'));
      frameCallback?.(0);
    });

    expect(context.fillText).toHaveBeenCalled();

    wrap.unmount();
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('uses the paper palette', () => {
    mount(<AsciiWaveBg themeMode="paper" />);

    expect(context.fillStyle).toBe('#3f3f46');
  });

  it('does nothing when the canvas context is unavailable', () => {
    (HTMLCanvasElement.prototype.getContext as jest.Mock).mockReturnValueOnce(
      null
    );

    const wrap = mount(<AsciiWaveBg themeMode="terminal" />);

    expect(context.fillText).not.toHaveBeenCalled();
    expect(wrap.find('canvas')).toHaveLength(1);
  });

  it('does nothing when the canvas context throws', () => {
    (HTMLCanvasElement.prototype.getContext as jest.Mock).mockReturnValueOnce(
      undefined
    );

    expect(() => mount(<AsciiWaveBg themeMode="terminal" />)).not.toThrow();
    expect(context.fillText).not.toHaveBeenCalled();
  });
});
